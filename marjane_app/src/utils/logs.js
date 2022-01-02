import { prisma } from "../../prisma/client";
export const logs = async (comment) => {
  const json = {
    author: comment.auth,
    operation: comment.operation,
    details: comment.details,
  };
  const createdLog = await prisma.logs.create({
    data: {
      comment: json,
    },
  });
};
