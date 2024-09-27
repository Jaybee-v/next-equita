import { EmailTemplateRepository } from "@/domain/repositories/EmailTemplateRepository";
import { EmailService } from "@/domain/services/EmailService";
// import { EmailData, EmailResult } from "@/domain/entities/Email";
import nodemailer from "nodemailer";
import { google } from "googleapis";
import { EmailData, EmailResult } from "@/domain/entities/Email";

export class NodemailerEmailService implements EmailService {
  private transporter: nodemailer.Transporter;
  private templateRepository: EmailTemplateRepository;
  private oauth2Client;

  constructor(templateRepository: EmailTemplateRepository) {
    this.templateRepository = templateRepository;

    this.oauth2Client = new google.auth.OAuth2(
      process.env.EMAIL_CLIENT_ID,
      process.env.EMAIL_CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );

    this.oauth2Client.setCredentials({
      refresh_token: process.env.EMAIL_REFRESH_TOKEN,
    });

    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.EMAIL_CLIENT_ID,
        clientSecret: process.env.EMAIL_CLIENT_SECRET,
        refreshToken: process.env.EMAIL_REFRESH_TOKEN,
        accessToken: this.getAccessToken(),
      },
      tls: {
        rejectUnauthorized: false,
      },
    } as nodemailer.TransportOptions);
  }

  private async getAccessToken(): Promise<string> {
    const { token } = await this.oauth2Client.getAccessToken();
    if (!token) throw new Error("Failed to get access token");
    return token;
  }

  async sendEmail(emailData: EmailData): Promise<EmailResult> {
    const template = this.templateRepository.getTemplate(
      emailData.templateName
    );
    if (!template) {
      return {
        success: false,
        error: `Template "${emailData.templateName}" not found`,
      };
    }

    let subject = template.subject;
    let html = template.html;

    Object.entries(emailData.variables).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, "g");
      subject = subject.replace(regex, value);
      html = html.replace(regex, value);
    });

    try {
      const info = await this.transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: emailData.to,
        subject,
        html,
      });
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error("Error sending email: ", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}
