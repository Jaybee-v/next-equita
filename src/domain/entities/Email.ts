export interface EmailTemplate {
  subject: string;
  html: string;
}

export interface EmailData {
  to: string;
  templateName: string;
  variables: Record<string, string>;
}

export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}
