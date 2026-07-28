import { Resume } from '@/types/resume';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function exportResumeToPDF(
  resume: Resume,
  templateElement: HTMLElement,
  filename: string = 'resume.pdf'
): Promise<void> {
  try {
    // Create canvas from the template element
    const canvas = await html2canvas(templateElement, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      allowTaint: true,
    });

    // Calculate dimensions
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth - 20; // 10mm margins
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 10;

    // Add image to PDF (handle multi-page)
    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight - 20;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight - 20;
    }

    // Save the PDF
    pdf.save(filename || `${resume.name}.pdf`);
  } catch (error) {
    console.error('Failed to export PDF:', error);
    throw new Error('Failed to export resume as PDF');
  }
}
