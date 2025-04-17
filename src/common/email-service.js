import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html,
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info);
    return info;
    
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmail;




// const sendOtpEmail = async (recipientEmail, otp) => {
//   try {
//     if (!process.env.BREVO_API_KEY) {
//       throw new Error("BREVO_API_KEY is missing or not loaded properly");
//     }

//     const client = SibApiV3Sdk.ApiClient.instance;
//     const apiKey = client.authentications["api-key"];
//     apiKey.apiKey = process.env.BREVO_API_KEY;

//     const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

//     // console.log(otp);
//     const sendSmtpEmail = {
//       sender: { email: "ankita.arya@hiteshi.com" },
//       to: [{ email: recipientEmail }],
//       templateId: 1,
//       params: { OTP: otp },
//     };
//     // console.log(sendSmtpEmail);
//     const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
//     // console.log(" Email sent successfully:", response);
//     return response;
//   } catch (error) {
//     console.error("Error sending email:", error.response?.body || error.message);
//     throw new Error("Failed to send OTP email");
//   }
// };
