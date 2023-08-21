import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({ log: ["query"] });

async function main() {
  try {
    await prisma.user.deleteMany();

    const users = await prisma.user.createMany({
      data: [
        {
          name: "Francisco",
          email: "fco.silva.dev@gmail.com",
          age: 27,
        },
        {
          name: "Dasha",
          email: "dasha@gmail.com",
          age: 26,
        },
        {
          name: "John",
          email: "john_white@gmail.com",
          age: 32,
        },
        {
          name: "John",
          email: "john_west@gmail.com",
          age: 40,
        },
        {
          name: "John",
          email: "john_brown@gmail.com",
          age: 60,
        },
      ],
    });
    console.log("Created users:", users);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
    console.log("Disconnected from DB");
  }
}

async function findUsers() {
  const user = await prisma.user.findUnique({
    where: {
      name_email: {
        name: "Francisco",
        email: "fco.silva.dev@gmail.com",
      },
    },
  });
  console.log("User:", user);
}

async function findManyUsers() {
  const user = await prisma.user.findMany({
    where: {
      name: "John",
    },
    orderBy: {
      age: "asc",
    },
    take: 3,
    skip: 1,
  });
  console.log("User:", user);
}

async function numberManyUsers() {
  const user = await prisma.user.findMany({
    where: {
      name: { equals: "John" },
    },
  });
  console.log("Quantity of users:", user.length);
}

async function notThis() {
  const user = await prisma.user.findMany({
    where: {
      name: { not: "John" },
    },
  });
  console.log("Quantity of users notThis:", user.length);
}

async function usersIn() {
  const user = await prisma.user.findMany({
    where: {
      name: { in: ["Francisco", "Dasha"] },
    },
  });
  console.log("Quantity of users In:", user.length);
}

async function agePlus() {
  const user = await prisma.user.findMany({
    where: {
      age: { gt: 30 },
    },
  });
  console.log("Quantity of users older than 30:", user.length);
}

async function ageMinus() {
  const user = await prisma.user.findMany({
    where: {
      age: { lt: 30 },
    },
  });
  console.log("Quantity of users younger than 30:", user.length);
}

async function containsEmail() {
  const user = await prisma.user.findMany({
    where: {
      email: { contains: "@gmail.com" },
    },
  });
  console.log("These users have the same email:", user.length);
}

async function firstName() {
  const user = await prisma.user.findMany({
    where: {
      name: { startsWith: "Fran" },
    },
  });
  console.log("Users that has this first name:", user);
}

async function nameEmail() {
  const user = await prisma.user.findMany({
    where: {
      AND: [
        { name: { startsWith: "Das" } },
        { email: { contains: "@gmail.com" } },
      ],
    },
  });
  console.log(
    "Users that has this first name and uses this email provider:",
    user
  );
}

async function queryPosts() {
  const user = await prisma.user.findMany({
    where: {
      writtenPosts: {
        some: {
          title: { startsWith: "Test" },
        },
      },
    },
  });
  console.log("Users that has written posts with this title:", user);
}

async function updateEmail() {
  const user = await prisma.user.update({
    where: {
      email: "john_brown@gmail.com",
    },
    data: {
      email: "john_yellow@gmail.com",
    },
  });
  console.log("The email was updated with success:", user);
}

(async () => {
  try {
    await main();
    await findUsers();
    await findManyUsers();
    await numberManyUsers();
    await notThis();
    await usersIn();
    await agePlus();
    await ageMinus();
    await containsEmail();
    await firstName();
    await nameEmail();
    await queryPosts();
    await updateEmail();
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
})();
