export const prisma = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
  chatSession: {
    findFirst: jest.fn(),
    create: jest.fn(),
  },
  message: {
    create: jest.fn(),
  },
  errorLog: {
    create: jest.fn(),
  },
  auditLog: {
    create: jest.fn(),
  },
};
