// src/utils/reusable-contact-action.ts

import { z } from 'zod';
import nodemailer from 'nodemailer';

// Define schema once
export const ContactFormSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  body: z.string().min(5, 'Message must be at least 5 characters'),
});

// Reusable function that handles validation and logic
export const handleContactForm = async (data: any, fail: (status: number, data: any) => any) => {
  const result = ContactFormSchema.safeParse(data);

  if (!result.success) {
    return fail(400, {
      errors: result.error.flatten().fieldErrors,
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    // Define email options
    let mailOptions = {
      from: process.env.GMAIL_USER, // Sender address
      to: 'crisfandino1@gmail.com', // List of recipients
      subject: `Contact - ${data.name}`, // Subject line
      text: data.body, // Plain text body
      html: `
      <div> <b>From: ${data.name}</b> </div>
      <p>
        ${data.body} 
      </p>
      ` // HTML body
  
    };
    let info = await transporter.sendMail(mailOptions);
  
  } catch (error) {
    return fail(400, { errors: { detail: 'Failed to send'}})
  }
  

  // Return success
  return { detail: "Successfully sent" };
};