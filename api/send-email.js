// You can use nodemailer here!
import nodemailer from 'nodemailer';
import { z } from 'zod';

// Define schema once
export const ContactFormSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  body: z.string().min(5, 'Message must be at least 5 characters'),
});

const defaultResponseHeaders = {
  'Content-Type': 'application/json',
}



/**
 * 
 * @param {Request} req 
 * @returns 
 */
export async function POST(
  req
) {

  const data = await req.json();

  const result = ContactFormSchema.safeParse(data);

  if (!result.success) {
    return new Response(JSON.stringify({
      errors: result.error.flatten().fieldErrors,
    }), {
      status: 400,
      headers: defaultResponseHeaders
    });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    console.log(process.env)
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'crisfandino1@gmail.com',
      subject: `Contact - ${result.data.name}`,
      text: result.data.body,
      html: `<div><b>From: ${result.data.email}</b></div><p>${result.data.body}</p>`,
    });

    return new Response(JSON.stringify({ errors: { detail: 'Email sent successfully' } }), {
      headers: defaultResponseHeaders,
    });
  } catch (error) {
    return new Response(JSON.stringify({ errors: { 
      detail: 'Failed to send email',
      error: error.message, 
    } }), {
      status: 400,
      headers: defaultResponseHeaders
    });
  }
}