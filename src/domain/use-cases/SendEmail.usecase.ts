import { EmailData, EmailResult } from "../entities/Email";
import { EmailService } from "../services/EmailService";

export class SendEmailUseCase {
  constructor(private emailService: EmailService) {}

  execute(emailData: EmailData): Promise<EmailResult> {
    return this.emailService.sendEmail(emailData);
  }
}
