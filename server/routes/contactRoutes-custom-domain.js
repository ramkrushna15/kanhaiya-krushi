const express = require('express');
const router = express.Router();
const { Contact } = require('../models/Service');
const nodemailer = require('nodemailer');

// Custom domain email configuration
// Replace with your actual domain email settings
const transporter = nodemailer.createTransporter({
  host: 'smtp.your-email-provider.com', // e.g., 'mail.kanhaiyakrushi.com'
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // prasad@kanhaiyakrushi.com
    pass: process.env.EMAIL_PASS  // your email password
  }
});

router.post('/', async (req, res) => {
  try {
    // Save contact to database
    const contact = await Contact.create(req.body);
    
    // Send email notification
    const mailOptions = {
      from: `"Kanhaiya Krushi Contact Form" <${process.env.EMAIL_USER}>`,
      to: 'info@kanhaiyakrushi.com',
      subject: 'New Contact Form Submission - Kanhaiya Krushi',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #2E7D32; text-align: center; margin-bottom: 20px;">🌱 New Contact Form Submission</h2>
            <hr style="border: 1px solid #e0e0e0; margin: 20px 0;">
            
            <div style="margin: 15px 0;">
              <strong style="color: #333; display: inline-block; width: 100px;">Name:</strong>
              <span style="color: #555;">${req.body.name}</span>
            </div>
            
            <div style="margin: 15px 0;">
              <strong style="color: #333; display: inline-block; width: 100px;">Email:</strong>
              <span style="color: #555;">${req.body.email}</span>
            </div>
            
            <div style="margin: 15px 0;">
              <strong style="color: #333; display: inline-block; width: 100px;">Phone:</strong>
              <span style="color: #555;">${req.body.phone || 'Not provided'}</span>
            </div>
            
            <div style="margin: 15px 0;">
              <strong style="color: #333; display: inline-block; width: 100px; vertical-align: top;">Subject:</strong>
              <span style="color: #555;">${req.body.subject || 'General Inquiry'}</span>
            </div>
            
            <div style="margin: 15px 0;">
              <strong style="color: #333; display: inline-block; width: 100px; vertical-align: top;">Message:</strong>
              <div style="color: #555; background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 5px;">
                ${req.body.message}
              </div>
            </div>
            
            <hr style="border: 1px solid #e0e0e0; margin: 20px 0;">
            <p style="color: #666; font-size: 12px; text-align: center; margin: 0;">
              Received on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
            </p>
          </div>
        </div>
      `
    };
    
    await transporter.sendMail(mailOptions);
    
    res.status(201).json({
      success: true,
      message: 'Thank you for contacting us! We will get back to you soon.',
      data: contact
    });
  } catch (error) {
    console.error('Contact form error:', error);
    
    // Even if email fails, we still saved the contact
    res.status(201).json({
      success: true,
      message: 'Thank you for contacting us! Your message has been received.',
      emailSent: false
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts',
      error: error.message
    });
  }
});

module.exports = router;