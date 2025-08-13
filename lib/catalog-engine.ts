import fs from 'fs'
import path from 'path'
import Handlebars from 'handlebars'
import { INDUSTRY_PACKS, DOCUMENT_CATALOG, getDocumentsForPack, getTemplatePath } from './catalog'

export interface CatalogTemplateData {
  businessName: string
  abn?: string
  address?: string
  contactEmail: string
  contactPhone?: string
  website?: string
  industry: string
  documentType: string
  additionalInfo?: string
}

export interface CatalogTemplateBlock {
  title: string
  content: string
  order: number
}

export class CatalogTemplateEngine {
  private templatesPath: string

  constructor() {
    this.templatesPath = path.join(process.cwd(), 'templates')
  }

  async generateCatalogDocument(
    data: CatalogTemplateData,
    format: 'pdf' | 'docx',
    industry: string,
    documentId: string
  ): Promise<any[]> {
    const blocks = this.getCatalogTemplateBlocks(industry, documentId)
    const processedContent = this.processContentBlocks(blocks, data)

    const files: any[] = []

    if (format === 'pdf') {
      const html = this.buildHtmlFromBlocks(blocks, data)
      files.push({
        type: 'pdf',
        content: html,
        filename: `${data.businessName}_${documentId}.pdf`,
        mimeType: 'text/html'
      })
    }

    if (format === 'docx') {
      const docxContent = this.buildDocxFromBlocks(blocks, data)
      files.push({
        type: 'docx',
        content: docxContent,
        filename: `${data.businessName}_${documentId}.docx`,
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      })
    }

    return files
  }

  private getCatalogTemplateBlocks(industry: string, documentId: string): CatalogTemplateBlock[] {
    const templatePath = getTemplatePath(industry, documentId)
    const fullPath = path.join(process.cwd(), templatePath)
    
    try {
      if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf-8')
        return this.parseMDXTemplate(content)
      }
    } catch (error) {
      console.error(`Error reading MDX template file: ${fullPath}`, error)
    }
    
    const genericPath = path.join(process.cwd(), 'templates', 'blocks', '_generic', `${documentId}.mdx`)
    
    try {
      if (fs.existsSync(genericPath)) {
        const content = fs.readFileSync(genericPath, 'utf-8')
        return this.parseMDXTemplate(content)
      }
    } catch (error) {
      console.error(`Error reading generic MDX template file: ${genericPath}`, error)
    }
    
    return [
      {
        title: documentId.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        content: `<p>This is a ${documentId} document for ${industry}.</p><p>Please customize this content based on your specific requirements.</p>`,
        order: 1
      }
    ]
  }

  private parseMDXTemplate(mdxContent: string): CatalogTemplateBlock[] {
    const sanitizedContent = this.sanitizeContent(mdxContent)
    const sections = sanitizedContent.split(/^## /m).filter(section => section.trim())
    
    return sections.map((section, index) => {
      const lines = section.split('\n')
      const title = lines[0].replace(/^#+ /, '').trim()
      const content = lines.slice(1).join('\n').trim()
      
      return {
        title,
        content: this.convertMDXToHTML(content),
        order: index + 1
      }
    })
  }

  private convertMDXToHTML(mdxContent: string): string {
    return mdxContent
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^(.+)$/gm, '<p>$1</p>')
      .replace(/<p><ul>/g, '<ul>')
      .replace(/<\/ul><\/p>/g, '</ul>')
  }

  private sanitizeContent(content: string): string {
    if (content.includes('—')) {
      console.warn('Template contains em-dash (—), replacing with hyphen (-)')
      return content.replace(/—/g, '-')
    }
    return content
  }

  private processContentBlocks(blocks: CatalogTemplateBlock[], data: CatalogTemplateData): string {
    return blocks
      .sort((a, b) => a.order - b.order)
      .map(block => {
        const processedContent = this.replacePlaceholders(block.content, data)
        return `<h2>${block.title}</h2>${processedContent}`
      })
      .join('\n\n')
  }

  private replacePlaceholders(content: string, data: CatalogTemplateData): string {
    const template = Handlebars.compile(content)
    
    const templateData = {
      businessName: data.businessName || '[Business Name]',
      abn: data.abn || '[ABN]',
      address: data.address || '[Business Address]',
      contactEmail: data.contactEmail || '[Contact Email]',
      contactPhone: data.contactPhone || '[Contact Phone]',
      website: data.website || '[Website]',
      industry: data.industry || '[Industry]',
      documentType: data.documentType || '[Document Type]',
      currentDate: new Date().toLocaleDateString('en-AU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
    
    return template(templateData)
  }

  private buildHtmlFromBlocks(blocks: CatalogTemplateBlock[], data: CatalogTemplateData): string {
    const processedContent = this.processContentBlocks(blocks, data)
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.documentType} - ${data.businessName}</title>
    <style>
        body { font-family: 'Segoe UI', sans-serif; line-height: 1.6; color: #333; margin: 2cm; }
        .header { text-align: center; border-bottom: 3px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px; }
        .business-name { font-size: 28px; font-weight: bold; color: #2563eb; margin-bottom: 8px; }
        .document-title { font-size: 24px; font-weight: bold; color: #1f2937; }
        h2 { color: #2563eb; margin-top: 25px; margin-bottom: 15px; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; font-size: 12px; color: #6b7280; }
    </style>
</head>
<body>
    <div class="header">
        <div class="business-name">${data.businessName}</div>
        <div class="document-title">${data.documentType}</div>
    </div>
    <div class="content">${processedContent}</div>
    <div class="footer">
        <p>Generated by ${data.businessName} | ${new Date().toLocaleDateString('en-AU')}</p>
    </div>
</body>
</html>`
  }

  private buildDocxFromBlocks(blocks: CatalogTemplateBlock[], data: CatalogTemplateData): string {
    const processedContent = this.processContentBlocks(blocks, data)
    return processedContent
  }
}
