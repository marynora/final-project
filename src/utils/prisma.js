import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;

// this seemed best practice to me. to import prisma from a single file 
// and use it across the codebase without having multiple connections.
// i installed prisma version 5.22.0. the latest version (7.8.0)
// has issues with prisma client and it caused some errors. 
