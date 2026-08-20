import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

interface EmailData {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: EmailData): Promise<boolean> {
  if (!resend) {
    console.warn('RESEND_API_KEY not configured — email not sent')
    return false
  }

  try {
    await resend.emails.send({
      from: 'EL WAHEED SHOES <noreply@elwaheedshoes.com>',
      to,
      subject,
      html,
    })
    return true
  } catch (error) {
    console.error('Failed to send email:', error)
    return false
  }
}

export function buildQuoteNotificationEmail(data: {
  companyName: string
  country: string
  contactPerson: string
  email: string
  phone: string
  message: string
}): string {
  return `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5;">
      <div style="background: #060606; padding: 20px; border-radius: 8px 8px 0 0;">
        <h1 style="color: #C8A951; margin: 0; font-size: 20px;">EL WAHEED SHOES</h1>
        <p style="color: #A0A0A0; margin: 4px 0 0;">New Quote Request</p>
      </div>
      <div style="background: white; padding: 20px; border-radius: 0 0 8px 8px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #666; font-weight: bold;">Company:</td><td style="padding: 8px 0;">${data.companyName}</td></tr>
          <tr><td style="padding: 8px 0; color: #666; font-weight: bold;">Country:</td><td style="padding: 8px 0;">${data.country}</td></tr>
          <tr><td style="padding: 8px 0; color: #666; font-weight: bold;">Contact:</td><td style="padding: 8px 0;">${data.contactPerson}</td></tr>
          <tr><td style="padding: 8px 0; color: #666; font-weight: bold;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #666; font-weight: bold;">Phone:</td><td style="padding: 8px 0;">${data.phone || 'N/A'}</td></tr>
        </table>
        <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
        <h3 style="color: #333; margin: 0 0 8px;">Message</h3>
        <p style="color: #555; line-height: 1.5; white-space: pre-wrap;">${data.message}</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
        <a href="https://wa.me/${process.env.WHATSAPP_NUMBER || '201114093000'}?text=${encodeURIComponent('Hello EL WAHEED SHOES, I received your quote request.')}" style="display: inline-block; background: #C8A951; color: #060606; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: bold;">Reply via WhatsApp</a>
      </div>
    </body>
    </html>
  `
}

export function buildContactNotificationEmail(data: {
  name: string
  company: string
  country: string
  email: string
  phone: string
  subject: string
  message: string
}): string {
  return `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5;">
      <div style="background: #060606; padding: 20px; border-radius: 8px 8px 0 0;">
        <h1 style="color: #C8A951; margin: 0; font-size: 20px;">EL WAHEED SHOES</h1>
        <p style="color: #A0A0A0; margin: 4px 0 0;">New Contact Inquiry</p>
      </div>
      <div style="background: white; padding: 20px; border-radius: 0 0 8px 8px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #666; font-weight: bold;">Name:</td><td style="padding: 8px 0;">${data.name}</td></tr>
          <tr><td style="padding: 8px 0; color: #666; font-weight: bold;">Company:</td><td style="padding: 8px 0;">${data.company}</td></tr>
          <tr><td style="padding: 8px 0; color: #666; font-weight: bold;">Country:</td><td style="padding: 8px 0;">${data.country}</td></tr>
          <tr><td style="padding: 8px 0; color: #666; font-weight: bold;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #666; font-weight: bold;">Phone:</td><td style="padding: 8px 0;">${data.phone || 'N/A'}</td></tr>
          <tr><td style="padding: 8px 0; color: #666; font-weight: bold;">Subject:</td><td style="padding: 8px 0;">${data.subject}</td></tr>
        </table>
        <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
        <h3 style="color: #333; margin: 0 0 8px;">Message</h3>
        <p style="color: #555; line-height: 1.5; white-space: pre-wrap;">${data.message}</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
        <a href="https://wa.me/${process.env.WHATSAPP_NUMBER || '201114093000'}?text=${encodeURIComponent('Hello EL WAHEED SHOES, I received your inquiry.')}" style="display: inline-block; background: #C8A951; color: #060606; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: bold;">Reply via WhatsApp</a>
      </div>
    </body>
    </html>
  `
}

export function buildNewsletterNotificationEmail(email: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5;">
      <div style="background: #060606; padding: 20px; border-radius: 8px 8px 0 0;">
        <h1 style="color: #C8A951; margin: 0; font-size: 20px;">EL WAHEED SHOES</h1>
        <p style="color: #A0A0A0; margin: 4px 0 0;">New Newsletter Subscriber</p>
      </div>
      <div style="background: white; padding: 20px; border-radius: 0 0 8px 8px;">
        <p style="color: #333;">A new user subscribed to the newsletter:</p>
        <p style="color: #555; font-size: 16px;"><a href="mailto:${email}">${email}</a></p>
      </div>
    </body>
    </html>
  `
}
