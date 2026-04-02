import "dotenv/config";

const prismaConfig = {
  schema: "./prisma/schema.prisma",
  migrations: {
    path: "./prisma/migrations",
  },
};

export default prismaConfig;


