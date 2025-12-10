import { env } from "../../config/env.config.js";
import { mailTransporter } from "../../config/mail.config.js";

export const sendEmail = async ({ to, subject, html }) => {
  try {
    await mailTransporter.sendMail({
      from: env.EMAIL_FROM,
      to,
      subject,
      html,
      attachments: [
        {
          filename: "logo.png",
          path: "D:/Coding/MERN PROJECTS/ShopFlow/backend/src/public/logo.png",
          cid: "shopflowLogo",
        },
      ],
    });
    console.log("Mail sent successfully");
  } catch (error) {
    console.error("Email Error:", error);
    throw new Error("Failed to send email");
  }
};
