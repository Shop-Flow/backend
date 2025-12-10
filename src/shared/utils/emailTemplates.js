import { env } from "../../config/env.config.js";

export const verificationTemplate = ({ token, name, role }) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification</title>
  </head>

  <body
    style="
      margin: 0;
      padding: 0;
      background-color: #e9ecef;
      font-family: Arial, sans-serif;
    "
  >
    <table width="100%" cellspacing="0" cellpadding="0" style="padding: 40px 0">
      <tr>
        <td align="center">
          <img src="cid:shopflowLogo" alt="Shopflow"  style="height: 46px; margin: 20px auto; display: block; "  />
          <!-- CARD CONTAINER -->
          <table
            width="560"
            cellpadding="0"
            cellspacing="0"
            style="
              background: #ffffff;
              border-radius: 24px;
              overflow: hidden;
              border: 1px solid #dfe3e8;
              box-shadow: 0 6px 22px rgba(0, 0, 0, 0.07);
            "
          >
            <!-- HERO SECTION -->
            <tr>
              <td
                style="
                  background: linear-gradient(135deg, #032e15, #064d26);
                  padding: 10px 20px;
                  text-align: left;
                "
              >
              <h1 style="color: #00C950; line-height: 10px;">${role} Account Created</h1>
                <p
                  style="
                    color: white;
                    font-size: 14px;
                    letter-spacing: 0.5px;
                  "
                >
                  Secure • Fast • Trusted Verification
                </p>
              </td>
            </tr>

            <!-- CONTENT -->
            <tr>
              <td style="padding: 36px 32px">
                <h2
                  style="
                    margin: 0;
                    color: #032e15;
                    font-size: 24px;
                    font-weight: 700;
                    letter-spacing: -0.3px;
                    text-transform: capitalize;
                  "
                >
                  Welcome to Shopflow, ${name} 👋
                </h2>

                <p
                  style="
                    margin-top: 18px;
                    color: #444;
                    font-size: 15px;
                    line-height: 1.65;
                  "
                >
                  We’re thrilled to have you here. Before getting started,
                  please confirm your email address to activate your Shopflow
                  account and unlock your dashboard, analytics, and store setup
                  utilities.
                </p>

                <!-- BUTTON -->
                <div style="text-align: center; margin: 38px 0">
                  <a
                    href="${env.CLIENT_URL + "/verifyEmail/" + token}"
                    style="
                      background-color: #032e15;
                      color: #ffffff;
                      padding: 16px 34px;
                      text-decoration: none;
                      border-radius: 8px;
                      font-weight: bold;
                      font-size: 16px;
                      display: inline-block;
                      box-shadow: 0 4px 10px rgba(3, 46, 21, 0.25);
                      letter-spacing: 0.4px;
                    "
                  >
                    Verify Your Email
                  </a>
                </div>

                <p style="color: #808080; font-size: 13px; line-height: 1.6">
                  Didn’t request this? No problem — just ignore this message.
                </p>
              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td
                style="
                  background-color: #f5f5f5;
                  padding: 20px 30px;
                  text-align: center;
                  color: #777;
                  font-size: 12px;
                  border-top: 1px solid #e2e2e2;
                "
              >
                © 2025 Shopflow • All Rights Reserved
                <div style="margin-top: 6px; font-size: 11px">
                  This is an automated email — please do not reply.
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
