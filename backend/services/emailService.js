const nodemailer = require('nodemailer');

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD
  }
});

// Send registration link to potential agent
const sendRegistrationLinkEmail = async (email, registrationLink) => {
  try {
    const mailOptions = {
      from: `"Elite Jet Set Bolt" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Registration Link for Elite Jet Set Bolt',
      html: `
        <h2>Welcome to Elite Jet Set Bolt!</h2>
        <p>You've been invited to join Elite Jet Set Bolt as an agent.</p>
        <p>Click the button below to complete your registration:</p>
        <a href="${registrationLink}" style="display: inline-block; background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 20px 0;">Complete Registration</a>
        <p>This link will expire in 24 hours.</p>
        <p>If you did not request this invitation, please ignore this email.</p>
      `
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Registration link sent successfully' };
  } catch (error) {
    console.error('Error sending registration link:', error);
    return { success: false, error: 'Failed to send registration link', details: error.message };
  }
};

// Send welcome email to newly registered agent
const sendRegistrationEmail = async (email, firstName) => {
  try {
    const mailOptions = {
      from: `"Elite Jet Set Bolt" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Welcome to Elite Jet Set Bolt!',
      html: `
        <h2>Welcome to Elite Jet Set Bolt, ${firstName}!</h2>
        <p>Thank you for registering as an agent with Elite Jet Set Bolt.</p>
        <p>You can now log in to your account and access your unique contact form link.</p>
        <p>If you have any questions, please don't hesitate to contact us.</p>
      `
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Welcome email sent successfully' };
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return { success: false, error: 'Failed to send welcome email', details: error.message };
  }
};

// Send notification to admin about new agent registration
const sendAdminRegistrationNotification = async (user) => {
  try {
    const mailOptions = {
      from: `"Elite Jet Set Bolt" <${process.env.EMAIL_USER}>`,
      to: 'apollodigitalspro@gmail.com',
      subject: 'New Agent Registration',
      html: `
        <h2>New Agent Registration</h2>
        <p>A new agent has registered with Elite Jet Set Bolt:</p>
        <div style="background-color: #f8f9fa; padding: 15px; margin-bottom: 20px; border-radius: 5px;">
          <p style="margin: 0; color: #666;">Agent Details:</p>
          <p style="margin: 5px 0; font-size: 16px;"><strong>${user.firstName} ${user.lastName}</strong></p>
          <p style="margin: 5px 0;"><strong>Email:</strong> ${user.email}</p>
          <p style="margin: 5px 0;"><strong>Username:</strong> ${user.username}</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Admin notification sent successfully' };
  } catch (error) {
    console.error('Error sending admin notification:', error);
    return { success: false, error: 'Failed to send admin notification', details: error.message };
  }
};

// Send test email
const sendTestEmail = async () => {
  try {
    const mailOptions = {
      from: `"Elite Jet Set Bolt" <${process.env.EMAIL_USER}>`,
      to: 'hassangazder3@gmail.com',
      subject: 'Test Email from Elite Jet Set Bolt',
      html: `
        <h2>Test Email</h2>
        <p>This is a test email from Elite Jet Set Bolt.</p>
        <p>If you received this email, your email service is working correctly.</p>
      `
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Test email sent successfully' };
  } catch (error) {
    console.error('Error sending test email:', error);
    return { success: false, error: 'Failed to send test email', details: error.message };
  }
};

/**
 * Send contact form submission notifications
 */
const sendContactFormEmail = async (contactData, agentUsername = null) => {
  try {
    const { name, email, phone, message, destination, travelDate, numberOfTravelers, budget } = contactData;
    
    // Prepare email content
    const emailContent = {
      html: `
        <h2>New Travel Inquiry</h2>
        <div style="background-color: #f8f9fa; padding: 15px; margin-bottom: 20px; border-radius: 5px;">
          <p style="margin: 0; color: #666;">Inquiry from:</p>
          <p style="margin: 5px 0; font-size: 16px;"><strong>${name}</strong> (${email})</p>
        </div>
        
        <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
          <h3 style="margin-top: 0; color: #374151;">Contact Information</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
        </div>

        <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
          <h3 style="margin-top: 0; color: #374151;">Travel Details</h3>
          <p><strong>Destination:</strong> ${destination}</p>
          <p><strong>Travel Date:</strong> ${travelDate}</p>
          <p><strong>Number of Travelers:</strong> ${numberOfTravelers}</p>
          <p><strong>Budget Range:</strong> ${budget}</p>
        </div>

        <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px;">
          <h3 style="margin-top: 0; color: #374151;">Message</h3>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
        
        ${agentUsername ? `
        <div style="margin-top: 20px; padding: 10px; background-color: #f3f4f6; border-radius: 4px;">
          <p style="margin: 0;"><strong>Referred by Agent:</strong> ${agentUsername}</p>
        </div>
        ` : ''}
      `
    };

    // Send email to admin
    const adminMailOptions = {
      from: `"${name} via Elite Jet Set Bolt" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: 'apollodigitalspro@gmail.com',
      subject: `New Travel Inquiry - ${destination}`,
      ...emailContent
    };

    await transporter.sendMail(adminMailOptions);
    
    return { success: true, message: 'Contact form notification sent successfully' };
  } catch (error) {
    console.error('Contact form email error:', error);
    return { success: false, error: 'Failed to send contact form notification', details: error.message };
  }
};

/**
 * Send contact form submission notification to referring agent
 */
const sendAgentContactFormEmail = async (contactData, agentEmail) => {
  try {
    const { name, email, phone, message, destination, travelDate, numberOfTravelers, budget } = contactData;
    
    const agentMailOptions = {
      from: `"${name} via Elite Jet Set Bolt" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: agentEmail,
      subject: `New Travel Inquiry - ${destination}`,
      html: `
        <h2>New Travel Inquiry from Your Referral</h2>
        <div style="background-color: #f8f9fa; padding: 15px; margin-bottom: 20px; border-radius: 5px;">
          <p style="margin: 0; color: #666;">Inquiry from:</p>
          <p style="margin: 5px 0; font-size: 16px;"><strong>${name}</strong> (${email})</p>
        </div>
        
        <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
          <h3 style="margin-top: 0; color: #374151;">Contact Information</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
        </div>

        <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
          <h3 style="margin-top: 0; color: #374151;">Travel Details</h3>
          <p><strong>Destination:</strong> ${destination}</p>
          <p><strong>Travel Date:</strong> ${travelDate}</p>
          <p><strong>Number of Travelers:</strong> ${numberOfTravelers}</p>
          <p><strong>Budget Range:</strong> ${budget}</p>
        </div>

        <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px;">
          <h3 style="margin-top: 0; color: #374151;">Message</h3>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `
    };

    await transporter.sendMail(agentMailOptions);
    return { success: true, message: 'Agent notification sent successfully' };
  } catch (error) {
    console.error('Agent notification email error:', error);
    return { success: false, error: 'Failed to send agent notification', details: error.message };
  }
};

module.exports = {
  sendRegistrationLinkEmail,
  sendRegistrationEmail,
  sendAdminRegistrationNotification,
  sendTestEmail,
  sendContactFormEmail,
  sendAgentContactFormEmail
}; 