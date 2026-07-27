import { jsPDF } from 'jspdf';

export const exportEventToPDF = (event, clubInfo) => {
  if (!event) return;

  const doc = new jsPDF();
  
  // Header section
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(79, 70, 229); // Indigo-600 color
  doc.text("EventSync", 14, 20);
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(100, 116, 139);
  doc.text("Campus Events & Engagement Platform", 14, 25);
  
  // Right aligned date/time generated
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`Generated: ${today}`, 196, 20, { align: 'right' });
  
  // Divider
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(14, 29, 196, 29);
  
  // Event Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(15, 23, 42);
  const splitTitle = doc.splitTextToSize(event.title, 182);
  doc.text(splitTitle, 14, 40);
  
  let currentY = 40 + (splitTitle.length * 6) + 4;
  
  // Club organizer line
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text(`Hosted by: ${event.clubName || (clubInfo ? clubInfo.name : 'College Club')}`, 14, currentY);
  currentY += 8;

  // Tags
  if (event.tags && event.tags.length > 0) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(129, 140, 248); // Light Indigo
    doc.text(`Tags: ${event.tags.join(', ')}`, 14, currentY);
    currentY += 10;
  } else {
    currentY += 2;
  }
  
  // Details Card Box
  doc.setFillColor(248, 250, 252); // grey-50
  doc.rect(14, currentY, 182, 38, "F");
  doc.setDrawColor(226, 232, 240);
  doc.rect(14, currentY, 182, 38, "S");
  
  // Date Row
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(79, 70, 229);
  doc.text("DATE", 20, currentY + 8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(15, 23, 42);
  const formatDate = (dateStr) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
      return dateStr;
    }
  };
  doc.text(formatDate(event.date), 60, currentY + 8);
  
  // Time Row
  doc.setFont("helvetica", "bold");
  doc.setTextColor(79, 70, 229);
  doc.text("TIME & DURATION", 20, currentY + 16);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(15, 23, 42);
  doc.text(`${event.time} (${event.duration || 'N/A'})`, 60, currentY + 16);
  
  // Venue Row
  doc.setFont("helvetica", "bold");
  doc.setTextColor(79, 70, 229);
  doc.text("VENUE / LOCATION", 20, currentY + 24);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(15, 23, 42);
  doc.text(event.venue, 60, currentY + 24);

  // Registration Row
  doc.setFont("helvetica", "bold");
  doc.setTextColor(79, 70, 229);
  doc.text("REGISTRATION TYPE", 20, currentY + 32);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(15, 23, 42);
  doc.text(event.registrationType === 'internal' ? 'Internal (On-site Portal)' : `External Link: ${event.registrationLink || ''}`, 60, currentY + 32);
  
  currentY += 48;
  
  // About / Description Section
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text("About the Event", 14, currentY);
  
  // Description Divider
  doc.setDrawColor(241, 245, 249);
  doc.line(14, currentY + 2, 196, currentY + 2);
  currentY += 7;
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(51, 65, 85);
  const splitDesc = doc.splitTextToSize(event.description, 182);
  doc.text(splitDesc, 14, currentY);
  currentY += (splitDesc.length * 5) + 8;
  
  // Eligibility Section
  if (event.criteria) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text("Guidelines & Eligibility", 14, currentY);
    
    doc.setDrawColor(241, 245, 249);
    doc.line(14, currentY + 2, 196, currentY + 2);
    currentY += 7;
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(51, 65, 85);
    const splitCriteria = doc.splitTextToSize(event.criteria, 182);
    doc.text(splitCriteria, 14, currentY);
    currentY += (splitCriteria.length * 5) + 8;
  }
  
  // Club Info Section
  if (clubInfo) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text(`Organizing Club: ${clubInfo.name}`, 14, currentY);
    
    doc.setDrawColor(241, 245, 249);
    doc.line(14, currentY + 2, 196, currentY + 2);
    currentY += 7;
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(51, 65, 85);
    const splitClub = doc.splitTextToSize(clubInfo.description || '', 182);
    doc.text(splitClub, 14, currentY);
    currentY += (splitClub.length * 5) + 8;
  }
  
  // Footer
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text("© EventSync Campus Ecosystem. All rights reserved.", 14, 285);
  doc.text("Check the live EventSync portal for updates, schedules, and active waiting list slots.", 196, 285, { align: 'right' });
  
  // Save PDF
  const filename = `eventsync_${event.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.pdf`;
  doc.save(filename);
};
