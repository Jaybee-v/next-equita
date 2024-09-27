import { EmailTemplate } from "../entities/Email";

export interface EmailTemplateRepository {
  getTemplate(name: string): EmailTemplate | undefined;
}
