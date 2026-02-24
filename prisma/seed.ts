import { PrismaClient } from "@prisma/client";
import { providers } from "../src/data/seed-data";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  for (const provider of providers) {
    await prisma.provider.upsert({
      where: { slug: provider.slug },
      update: provider,
      create: provider,
    });
  }

  console.log(`Seeded ${providers.length} providers`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
