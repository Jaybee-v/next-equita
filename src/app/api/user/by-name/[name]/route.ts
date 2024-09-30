import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { name: string } }
) {
  const { name } = params;

  try {
    // Convertir le nom recherché en minuscule
    const lowercasedName = name.toLowerCase();

    // Rechercher les utilisateurs avec le nom exact
    const users = await prisma.user.findMany({
      where: {
        name: {
          contains: lowercasedName,
        },
        role: "teacher" || "stable",
      },
      take: 10,
    });

    // Si aucun résultat n'est trouvé, passer à une recherche plus souple
    if (users.length === 0) {
      const fallbackUsers = await prisma.user.findMany({
        where: {
          OR: [
            // Chercher un nom contenant les 5 premiers caractères, plus tolérant
            { name: { contains: lowercasedName.slice(0, 5) } },
            // Chercher par email en utilisant contains, plus souple
            { email: { contains: lowercasedName } },
          ],
          role: "teacher" || "stable",
        },
        take: 10,
      });

      if (fallbackUsers.length > 0) {
        return NextResponse.json(
          {
            message:
              "Aucune correspondance exacte trouvée. Voici des suggestions :",
            users: fallbackUsers,
          },
          { status: 200 }
        );
      }
    }

    // Si aucun utilisateur trouvé après le fallback
    if (users.length === 0) {
      return NextResponse.json(
        { message: "Aucun utilisateur trouvé" },
        { status: 404 }
      );
    }

    // Retourner les utilisateurs correspondants
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la recherche d'utilisateurs:", error);
    return NextResponse.json(
      { error: "Échec de la recherche d'utilisateurs" },
      { status: 500 }
    );
  }
}
