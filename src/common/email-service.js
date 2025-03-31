import SibApiV3Sdk from "sib-api-v3-sdk";
import dotenv from "dotenv";

dotenv.config(); 

const sendOtpEmail = async (recipientEmail, otp) => {
  try {
    if (!process.env.BREVO_API_KEY) {
      throw new Error("BREVO_API_KEY is missing or not loaded properly");
    }

    const client = SibApiV3Sdk.ApiClient.instance;
    const apiKey = client.authentications["api-key"];
    apiKey.apiKey = process.env.BREVO_API_KEY;

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    // console.log(otp);
    const sendSmtpEmail = {
      sender: { email: "ankita.arya@hiteshi.com" },
      to: [{ email: recipientEmail }],
      templateId: 1,
      params: { OTP: otp },
    };
    // console.log(sendSmtpEmail);
    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    // console.log(" Email sent successfully:", response);
    return response;
  } catch (error) {
    console.error("Error sending email:", error.response?.body || error.message);
    throw new Error("Failed to send OTP email");
  }
};

export default sendOtpEmail;
