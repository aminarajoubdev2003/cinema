
import 'dotenv/config';

import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function getSqlFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });

  const files: string[] = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const subDir = path.join(dir, entry.name);

      const subFiles = await getSqlFiles(subDir);

      files.push(...subFiles);
    }

    if (entry.isFile() && entry.name.endsWith('.sql')) {
      files.push(path.join(dir, entry.name));
    }
  }

  return files;
}

async function deployFunctions() {
  const functionsDir = path.join(
    process.cwd(),
    'src',
    'database',
    'functions',
  );

  const sqlFiles = await getSqlFiles(functionsDir);

  for (const filePath of sqlFiles) {
    const sql = await readFile(filePath, 'utf8');

    console.log(`Deploying: ${filePath}`);
    
    await prisma.$executeRawUnsafe(sql);

    console.log(`Deployed: ${filePath}`);
  }

  console.log('All database functions deployed successfully');
}

deployFunctions()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

