import { SendEmailUseCase } from "@/domain/use-cases/SendEmail.usecase";
import { NodemailerEmailService } from "@/infrastructure/services/email-service.service";
import { StaticEmailTemplateRepository } from "@/infrastructure/services/static-email-template.service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const emailData = await req.json();
    const templateRepository = new StaticEmailTemplateRepository();
    const emailService = new NodemailerEmailService(templateRepository);
    const sendEmailUseCase = new SendEmailUseCase(emailService);
    const result = await sendEmailUseCase.execute(emailData);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi de l'email" },
      { status: 500 }
    );
  }
}
