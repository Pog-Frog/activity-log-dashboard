import { PrismaClient } from '@prisma/client'
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient()

async function main() {
    
  const actions = [];
  const metadatas = [];
  for (let i = 0; i < 100; i++) {
    actions.push({
      object: faker.random.word(),
      name: faker.random.word(),
    });

    metadatas.push({
      redirect: faker.internet.url(),
      x_request_id: faker.random.alphaNumeric(10),
    });
  }

  const createdActions = await prisma.action.createMany({
    data: actions,
  });

  const createdMetadatas = await prisma.metaData.createMany({
    data: metadatas,
  });

  const createdActionsArray = await prisma.action.findMany();
  const createdMetadatasArray = await prisma.metaData.findMany();

  const events = [];
  for (let i = 0; i < 100; i++) {
    events.push({
      object: faker.random.word(),
      actor_id: faker.datatype.uuid(),
      actor_name: faker.name.fullName(),
      group: faker.random.word(),
      action_id: createdActionsArray[i].id,
      target_id: faker.datatype.uuid(),
      target_name: faker.name.fullName(),
      location: faker.address.city(),
      occurred_at: faker.date.past(),
      metadata_id: createdMetadatasArray[i].id,
    });
  }

  await prisma.event.createMany({
    data: events,
  });

  console.log('>Seeding script: Generated 100 random events with associated actions and metadata');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
