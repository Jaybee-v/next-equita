import { EmailTemplate } from "@/domain/entities/Email";
import { EmailTemplateRepository } from "@/domain/repositories/EmailTemplateRepository";

export class StaticEmailTemplateRepository implements EmailTemplateRepository {
  private templates: Record<string, EmailTemplate> = {
    welcome: {
      subject: "Bienvenue sur notre plateforme, {{name}}!",
      html: `
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #4CAF50; color: white; padding: 10px; text-align: center; }
                .content { background-color: #f9f9f9; border: 1px solid #ddd; padding: 20px; }
                .footer { text-align: center; margin-top: 20px; font-size: 0.8em; color: #777; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Bienvenue, {{name}}!</h1>
                </div>
                <div class="content">
                  <p>Cher(e) {{name}},</p>
                  <p>Nous sommes ravis de vous accueillir sur notre plateforme. Votre compte a été créé avec succès.</p>
                  <p>Voici quelques informations pour commencer :</p>
                  <ul>
                    <li>Votre nom d'utilisateur : <strong>{{username}}</strong></li>
                    <li>Date d'inscription : <strong>{{date}}</strong></li>
                  </ul>
                  <p>N'hésitez pas à nous contacter si vous avez des questions.</p>
                </div>
                <div class="footer">
                  <p>Cordialement,<br>L'équipe {{companyName}}</p>
                </div>
              </div>
            </body>
          </html>
        `,
    },
    // Ajoutez d'autres modèles ici...
  };
  getTemplate(templateName: string): EmailTemplate | undefined {
    return this.templates[templateName];
  }
}
