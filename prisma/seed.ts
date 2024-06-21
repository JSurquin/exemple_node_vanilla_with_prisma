// Importation du client Prisma et création d'une nouvelle instance
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Fonction principale asynchrone pour semer les données
async function main() {
  // Création de 200 utilisateurs avec des données aléatoires
  new Array(200).fill(0).map(async (_, index) => {
    const user = await prisma.user.create({
      data: {
        name: "Alice", // Nom de l'utilisateur
        email: `random${Math.random().toString(36).substr(2, 9)}@example.com`, // Email aléatoire
        password: "", // Mot de passe vide pour simplifier
      },
    });

    // Création d'un transporteur pour l'utilisateur à l'index 2
    if (index === 2) {
      await prisma.transporter.create({
        data: {
          name: "Transporter 1", // Nom du transporteur
          userId: user.id, // ID de l'utilisateur associé
        },
      });
    }
    // Création d'une commande pour les utilisateurs à partir de l'index 11
    else if (index > 10) {
      await prisma.orders.create({
        data: {
          userId: user.id, // ID de l'utilisateur associé
          email: "john", // Email de la commande
          transporterId: 1, // ID du transporteur associé
          name: "Order 1", // Nom de la commande
        },
      });
    }
  });
}

// Exécution de la fonction principale et gestion des erreurs
main()
  .then(async () => {
    // Déconnexion de la base de données après la fin de la sémance
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e); // Affichage de l'erreur dans la console
    await prisma.$disconnect(); // Déconnexion de la base de données en cas d'erreur
    process.exit(1); // Sortie du processus avec un code d'erreur
  });

// Fin de la sélection
