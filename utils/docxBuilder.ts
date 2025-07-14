// utils/docxBuilder.ts
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { BusinessInfo } from '@/types';

export const generateDocx = async (
  documentType: string,
  content: string,
  businessInfo: BusinessInfo
): Promise<Buffer> => {
  try {
    const lines = content.split('\n').filter(line => line.trim());
    const paragraphs: Paragraph[] = [];

    // Add header
    paragraphs.push(
      new Paragraph({
        text: businessInfo.businessName,
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({
        text: `ABN: ${businessInfo.abn}`,
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({
        text: documentType,
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({ text: '' })
    );

    // Process content
    for (const line of lines) {
      if (line.startsWith('#')) {
        paragraphs.push(
          new Paragraph({
            text: line.replace(/^#+\s*/, ''),
            heading: HeadingLevel.HEADING_2,
          })
        );
      } else if (line.trim()) {
        paragraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: line,
                size: 24,
              })
            ]
          })
        );
      }
    }

    const doc = new Document({
      sections: [{ properties: {}, children: paragraphs }],
    });

    return await Packer.toBuffer(doc);
  } catch (error) {
    console.error('Error generating DOCX:', error);
    throw new Error('Failed to generate DOCX document');
  }
};