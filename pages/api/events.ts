import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { searchQuery } = req.query;


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