// utils/pdfBuilder.ts
import { BusinessInfo } from '@/types';

export const generatePdf = async (
  documentType: string,
  content: string,
  businessInfo: BusinessInfo
): Promise<Buffer> => {
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    console.warn('Puppeteer not available in serverless environment, using fallback PDF generation');
    return generateFallbackPdf(documentType, content, businessInfo);
  }

  let browser;
  
  try {
    const puppeteer = await import('puppeteer');
    
    // Launch Puppeteer
    browser = await puppeteer.default.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
        '--disable-gpu'
      ]
    });

    const page = await browser.newPage();
    
    // Set viewport for consistent rendering
    await page.setViewport({ width: 1200, height: 800 });

    // Process content to convert markdown-style headers to HTML
    const processedContent = content
      .split('\n')
      .map(line => {
        const trimmed = line.trim();
        if (!trimmed) return '<br>';
        
        // Convert markdown headers
        if (trimmed.startsWith('###')) {
          return `<h3>${trimmed.replace(/^###\s*/, '')}</h3>`;
        } else if (trimmed.startsWith('##')) {
          return `<h2>${trimmed.replace(/^##\s*/, '')}</h2>`;
        } else if (trimmed.startsWith('#')) {
          return `<h2>${trimmed.replace(/^#\s*/, '')}</h2>`;
        } else if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
          return `<p><strong>${trimmed.slice(2, -2)}</strong></p>`;
        } else if (trimmed.startsWith('*') && trimmed.endsWith('*')) {
          return `<p><em>${trimmed.slice(1, -1)}</em></p>`;
        } else if (trimmed.startsWith('- ')) {
          return `<li>${trimmed.substring(2)}</li>`;
        } else {
          return `<p>${trimmed}</p>`;
        }
      })
      .join('\n');

    // Wrap list items in ul tags
    const finalContent = processedContent
      .replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`);

    // Create HTML template
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${documentType} - ${businessInfo.businessName}</title>
    <style>
        @page {
            margin: 2cm;
            size: A4;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 21cm;
            margin: 0 auto;
            background: white;
        }
        
        .header {
            text-align: center;
            border-bottom: 3px solid #2563eb;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        
        .company-name {
            font-size: 28px;
            font-weight: bold;
            color: #1e40af;
            margin-bottom: 8px;
        }
        
        .abn {
            font-size: 14px;
            color: #6b7280;
            margin-bottom: 15px;
        }
        
        .document-title {
            font-size: 24px;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 0;
        }
        
        .content {
            margin-top: 20px;
        }
        
        h1, h2, h3 {
            color: #1f2937;
            margin-top: 25px;
            margin-bottom: 15px;
        }
        
        h1 {
            font-size: 24px;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 10px;
        }
        
        h2 {
            font-size: 20px;
            color: #374151;
        }
        
        h3 {
            font-size: 18px;
            color: #4b5563;
        }
        
        p {
            margin-bottom: 12px;
            text-align: justify;
        }
        
        ul, ol {
            margin-bottom: 15px;
            padding-left: 20px;
        }
        
        li {
            margin-bottom: 6px;
        }
        
        strong {
            color: #1f2937;
        }
        
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            text-align: center;
            font-size: 12px;
            color: #6b7280;
        }
        
        .page-break {
            page-break-before: always;
        }
        
        .highlight {
            background-color: #fef3c7;
            padding: 15px;
            border-left: 4px solid #f59e0b;
            margin: 20px 0;
        }
        
        .important {
            background-color: #fee2e2;
            padding: 15px;
            border-left: 4px solid #ef4444;
            margin: 20px 0;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        
        th, td {
            border: 1px solid #d1d5db;
            padding: 12px;
            text-align: left;
        }
        
        th {
            background-color: #f3f4f6;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="company-name">${businessInfo.businessName}</div>
        <div class="abn">ABN: ${businessInfo.abn}</div>
        <div class="document-title">${documentType}</div>
    </div>
    
    <div class="content">
        ${finalContent}
    </div>
    
    <div class="footer">
        <p>Generated on ${new Date().toLocaleDateString('en-AU', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })} | ${businessInfo.businessName}</p>
        <p>This document was automatically generated and should be reviewed by qualified professionals.</p>
    </div>
</body>
</html>`;

    // Set the HTML content
    await page.setContent(html, { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '2cm',
        right: '2cm',
        bottom: '2cm',
        left: '2cm'
      },
      displayHeaderFooter: true,
      headerTemplate: `
        <div style="font-size: 10px; width: 100%; text-align: center; color: #666;">
          ${businessInfo.businessName} - ${documentType}
        </div>
      `,
      footerTemplate: `
        <div style="font-size: 10px; width: 100%; text-align: center; color: #666;">
          <span class="pageNumber"></span> of <span class="totalPages"></span>
        </div>
      `
    });

    return Buffer.from(pdfBuffer);

  } catch (error) {
    console.error('Error generating PDF with Puppeteer:', error);
    console.warn('Falling back to alternative PDF generation');
    return generateFallbackPdf(documentType, content, businessInfo);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

const generateFallbackPdf = async (
  documentType: string,
  content: string,
  businessInfo: BusinessInfo
): Promise<Buffer> => {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${documentType} - ${businessInfo.businessName}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
    .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 20px; margin-bottom: 30px; }
    .company-name { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
    .document-title { font-size: 20px; font-weight: bold; }
    .content { margin-top: 20px; }
    h1, h2, h3 { color: #333; margin-top: 20px; }
    p { margin-bottom: 10px; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ccc; text-align: center; font-size: 12px; }
  </style>
</head>
<body>
  <div class="header">
    <div class="company-name">${businessInfo.businessName}</div>
    <div>ABN: ${businessInfo.abn}</div>
    <div class="document-title">${documentType}</div>
  </div>
  <div class="content">${content}</div>
  <div class="footer">
    <p>Generated on ${new Date().toLocaleDateString('en-AU')} | ${businessInfo.businessName}</p>
  </div>
</body>
</html>`;

  const htmlBuffer = Buffer.from(html, 'utf-8');
  return htmlBuffer;
};

// Helper function to estimate content length for page breaks
export const addPageBreaksToContent = (content: string, maxLinesPerPage: number = 45): string => {
  const lines = content.split('\n');
  const result: string[] = [];
  let currentPageLines = 0;

  for (const line of lines) {
    // Add page break if we're getting close to the limit
    if (currentPageLines >= maxLinesPerPage && line.trim().startsWith('#')) {
      result.push('<div class="page-break"></div>');
      currentPageLines = 0;
    }
    
    result.push(line);
    currentPageLines++;
  }

  return result.join('\n');
};

// Helper function to add highlights and callouts
export const enhanceContentForPdf = (content: string): string => {
  return content
    .replace(/\[IMPORTANT\](.*?)\[\/IMPORTANT\]/gs, '<div class="important">$1</div>')
    .replace(/\[HIGHLIGHT\](.*?)\[\/HIGHLIGHT\]/gs, '<div class="highlight">$1</div>');
};
