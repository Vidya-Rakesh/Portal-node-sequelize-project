const nodemailer = require('nodemailer');


const emailService = {
  sendEmail: async (to, subject, content) => {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: false,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.MAIL_USERNAME,
      to,
      subject,
      html: content
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.response);
    } catch (error) {
      console.log('Error occurred while sending email:', error);
      throw new Error('Failed to send email');
    }
  }
};

module.exports = {
  emailService
};
