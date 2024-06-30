import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { page, pageSize, searchQuery } = req.query;

  const pageNumber = parseInt(page as string) || 1;
  const size = parseInt(pageSize as string) || 10;

  try {
    const events = await prisma.event.findMany({
      where: {
        OR: [
          {
            actor_name: {
              contains: searchQuery as string,
            },
          },
          {
            object: {
              contains: searchQuery as string,
            },
          },
          {
            action: {
              name: {
                contains: searchQuery as string,
              },
            }
          }
        ],
      },
      take: size,
      skip: (pageNumber - 1) * size,
      orderBy: {
        id: 'desc',
      },
      include: {
        action: true,
      },
    });
    
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
  }
}