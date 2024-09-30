import { EmailTemplate } from "@/domain/entities/Email";
import { EmailTemplateRepository } from "@/domain/repositories/EmailTemplateRepository";

export class StaticEmailTemplateRepository implements EmailTemplateRepository {
  private templates: Record<string, EmailTemplate> = {
    welcome: {
      subject: "Bienvenue sur notre Equita-planner, {{name}}!",
      html: `
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #fff; color: #333; padding: 10px; text-align: center; }
                .title { font-weight: bold; color: #0c4a6e; }
                .content { background-color: #f9f9f9; border: 1px solid #ddd; padding: 20px; }
                .footer { text-align: center; margin-top: 20px; font-size: 0.8em; color: #777; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Bienvenue sur <span class="title">Equita-planner</span>, {{name}}!</h1>
                </div>
                <div class="content">
                  <p>Cher(e) {{name}},</p>
                  <p>Nous sommes ravis de vous accueillir sur notre plateforme. Votre compte a été créé avec succès.</p>
                  <p>Vous pouvez désormais vous connecter à votre compte et profiter de nos services grâce à l'adresse e-mail et le mot de passe que vous avez renseignés.</p>
                  <p>N'hésitez pas à nous contacter si vous avez des questions.</p>
                </div>
                <div class="footer">
                  <p>Cordialement,<br>L'équipe <span class="title">Equita-planner</span></p>
                </div>
              </div>
            </body>
          </html>
        `,
    },
    forgetPassword: {
      subject: "Réinitialisation de votre mot de passe pour Equita-planner",
      html: `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #fff; color: #333; padding: 10px; text-align: center; }
          .title { font-weight: bold; color: #0c4a6e; }
          .content { background-color: #f9f9f9; border: 1px solid #ddd; padding: 20px; }
          .footer { text-align: center; margin-top: 20px; font-size: 0.8em; color: #777; }
          .button { background-color: #0c4a6e; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Réinitialisation de votre mot de passe pour <span class="title">Equita-planner</span></h1>
          </div>
          <div class="content">
            <p>Cher(e) {{name}},</p>
            <p>Nous avons reçu une demande de réinitialisation de votre mot de passe. Pour procéder, veuillez cliquer sur le bouton ci-dessous :</p>
            <p><a href="{{resetLink}}" class="button">Réinitialiser mon mot de passe</a></p>
            <p>Si vous n'avez pas demandé cette réinitialisation, vous pouvez ignorer cet email.</p>
            <p>N'hésitez pas à nous contacter si vous avez des questions.</p>
          </div>
          <div class="footer">
            <p>Cordialement,<br>L'équipe <span class="title">Equita-planner</span></p>
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
