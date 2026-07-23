import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'service_sisis_kitchen';
const EMAILJS_TEMPLATE_ID = 'template_sisis_kitchen';
const EMAILJS_PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY'; // You'll need to replace this

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

export interface EmailData {
  to_email: string;
  from_name: string;
  from_email: string;
  from_phone: string;
  subject: string;
  message: string;
  form_type: string;
}

export const sendEmail = async (emailData: EmailData): Promise<boolean> => {
  try {
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        to_email: emailData.to_email,
        from_name: emailData.from_name,
        from_email: emailData.from_email,
        from_phone: emailData.from_phone,
        subject: emailData.subject,
        message: emailData.message,
        form_type: emailData.form_type,
        reply_to: emailData.from_email
      }
    );

    console.log('Email sent successfully:', response);
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
};