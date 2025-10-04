"use server";

import { connectToDB } from "@/lib/mongoose";
import Contact from "@/models/contact.model";

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
}

export interface ContactFormResult {
  success: boolean;
  message: string;
  error?: string;
}

export async function submitContactForm(formData: ContactFormData): Promise<ContactFormResult> {
  try {
    await connectToDB();

    const { firstName, lastName, email, company, subject, message } = formData;

    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      return {
        success: false,
        message: "Missing required fields",
        error: "Missing required fields"
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: "Invalid email format",
        error: "Invalid email format"
      };
    }

    // Create new contact entry
    const contact = new Contact({
      firstName,
      lastName,
      email,
      company: company || "",
      subject,
      message,
      status: "new",
    });

    await contact.save();

    return {
      success: true,
      message: "Thank you for your message! We'll get back to you within 24 hours."
    };
  } catch (error) {
    console.error("Contact form submission error:", error);
    return {
      success: false,
      message: "Failed to submit contact form. Please try again.",
      error: "Server error"
    };
  }
}
