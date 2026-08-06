import nodemailer from "nodemailer";

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export const sendConfirmationEmails = async (leadData) => {
  const { name, email, service, company, message, phone } = leadData;
  const companyEmail = process.env.COMPANY_EMAIL || process.env.SMTP_USER;

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn("SMTP credentials not configured. Skipping email sending.");
    return;
  }

  const transporter = createTransporter();

  // Email to the user (Client)
  const userMailOptions = {
    from: `"KrGo Technology Solutions" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "We received your inquiry - KrGo Technology Solutions",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #2563eb;">Thank you for contacting us, ${name}!</h2>
        <p>We have successfully received your inquiry regarding <strong>${service || 'our services'}</strong>.</p>
        <p>Our team will review your requirements and get back to you within 24 business hours.</p>
        
        <h3 style="margin-top: 30px;">Your submission details:</h3>
        <ul style="background: #f8fafc; padding: 15px 30px; border-radius: 5px;">
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          ${phone ? `<li><strong>Phone:</strong> ${phone}</li>` : ''}
          ${company ? `<li><strong>Company:</strong> ${company}</li>` : ''}
          <li><strong>Service:</strong> ${service || 'Not specified'}</li>
        </ul>
        
        <p style="margin-top: 30px; color: #64748b;">
          Best regards,<br/>
          <strong>KrGo Technology Solutions Team</strong><br/>
          <a href="https://krgotech.com">krgotech.com</a>
        </p>
      </div>
    `,
  };

  // Email to the company (Admin)
  const companyMailOptions = {
    from: `"KrGo Website" <${process.env.SMTP_USER}>`,
    to: companyEmail,
    subject: `New Lead: ${service || 'General Inquiry'} from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #2563eb;">New Lead Received</h2>
        <p>A new contact form submission has been received on the website.</p>
        
        <h3>Lead Details:</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${phone || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Company:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${company || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Service:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${service || 'N/A'}</td>
          </tr>
        </table>
        
        <h3>Message:</h3>
        <div style="background: #f8fafc; padding: 15px; border-radius: 5px; white-space: pre-wrap;">
          ${message || 'No message provided.'}
        </div>
      </div>
    `,
  };

  try {
    // Send both emails concurrently
    await Promise.all([
      transporter.sendMail(userMailOptions),
      transporter.sendMail(companyMailOptions)
    ]);
    console.log(`Confirmation emails sent for lead: ${email}`);
  } catch (error) {
    console.error("Error sending confirmation emails:", error);
    // We don't throw here to avoid failing the main lead saving process
    // if email fails for some reason
  }
};
