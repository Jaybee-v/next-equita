import { EmailData, EmailResult } from "../entities/Email";

export interface EmailService {
  sendEmail(emailData: EmailData): Promise<EmailResult>;
}
