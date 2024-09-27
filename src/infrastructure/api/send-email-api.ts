import { EmailData } from "@/domain/entities/Email";
import { SendEmailUseCase } from "@/domain/use-cases/SendEmail.usecase";
import { NextApiRequest, NextApiResponse } from "next";

export const sendEmailHandler =
  (sendEmailUseCase: SendEmailUseCase) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      return;
    }

    const emailData: EmailData = req.body;

    try {
      const result = await sendEmailUseCase.execute(emailData);
      if (result.success) {
        res
          .status(200)
          .json({
            message: "Email envoyé avec succès",
            messageId: result.messageId,
          });
      } else {
        res.status(500).json({ error: result.error });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de l'envoi de l'email" });
    }
  };
