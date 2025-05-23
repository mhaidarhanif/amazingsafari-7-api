import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { dataProducts } from "./data/products";
import { createNewSlug } from "../src/lib/slugify";

async function main() {
  for (const product of dataProducts) {
    const newProductResult = await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: {
        ...product,
        slug: createNewSlug(product.name),
      },
    });

    console.info(`🆕 Product: ${newProductResult.name}`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
