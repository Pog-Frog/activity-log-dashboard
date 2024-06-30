import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { page, pageSize, filterType, searchQuery } = req.query;

  const pageNumber = parseInt(page as string) || 1;
  const size = parseInt(pageSize as string) || 10;
  const filter = filterType as string;

  try {
    let events;
    switch (filter) {
      case 'actor_name':
        events = await prisma.event.findMany({
          where: {
            actor_name: {
              contains: searchQuery as string,
            },
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
        break;
      case 'actor_id':
        events = await prisma.event.findMany({
          where: {
            actor_id: {
              contains: searchQuery as string,
            },
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
        break;
      case 'target_id':
        events = await prisma.event.findMany({
          where: {
            target_id: {
              contains: searchQuery as string,
            },
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
        break;
      case 'action_id':
        events = await prisma.event.findMany({
          where: {
            action_id: {
              contains: searchQuery as string,
            },
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
        break;
      case 'action_name':
        events = await prisma.event.findMany({
          where: {
            action: {
              name: {
                contains: searchQuery as string,
              },
            },
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
        break;
      default:
        events = await prisma.event.findMany({
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
                },
              },
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
        break;
    }

    res.status(200).json(events);
  } catch (error) {
    console.error(error);
  }
}