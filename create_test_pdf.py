from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
import os

def create_test_pdf():
    filename = "test-policy.pdf"
    c = canvas.Canvas(filename, pagesize=letter)
    width, height = letter
    
    c.setFont("Helvetica-Bold", 16)
    c.drawString(50, height - 50, "Test Policy Document")
    c.drawString(50, height - 70, "Privacy Policy for Test Business Pty Ltd")
    
    c.setFont("Helvetica", 12)
    y_position = height - 120
    
    content = [
        "This is a sample privacy policy document for testing the Smart Upload & Audit Engine.",
        "",
        "1. Information Collection",
        "We collect personal information when you use our services including:",
        "- Name and contact details",
        "- Business information", 
        "- Usage data and analytics",
        "",
        "2. Information Use",
        "We use your information to:",
        "- Provide and improve our services",
        "- Communicate with you about our services",
        "- Comply with legal obligations",
        "",
        "3. Information Sharing",
        "We do not share your personal information with third parties except:",
        "- With your explicit consent",
        "- To comply with legal requirements",
        "- To protect our rights and safety",
        "",
        "4. Data Security",
        "We implement appropriate security measures including:",
        "- Encryption of data in transit and at rest",
        "- Regular security audits",
        "- Access controls and authentication",
        "",
        "5. Contact Information",
        "For questions about this policy, contact us at:",
        "- Email: privacy@testbusiness.com.au",
        "- Phone: (02) 1234 5678",
        "- Address: 123 Test Street, Sydney NSW 2000"
    ]
    
    for line in content:
        if y_position < 50:  # Start new page if needed
            c.showPage()
            y_position = height - 50
            c.setFont("Helvetica", 12)
        
        c.drawString(50, y_position, line)
        y_position -= 20
    
    c.save()
    print(f"Created {filename}")
    return filename

if __name__ == "__main__":
    create_test_pdf()
