import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.equipments.createMany({
    data: [
      { equipment_type: "Industrial Printers" },
      { equipment_type: "Packaging Equipment" },
      { equipment_type: "Quality Control Systems" },
      { equipment_type: "Automation Tools" },
      { equipment_type: "Storage Solutions" },
      { equipment_type: "Transport Vehicles" },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(() => console.log("✅ Equipment seed selesai"))
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
