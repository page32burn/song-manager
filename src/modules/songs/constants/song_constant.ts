export const SONGS_CONSTANTS = {
  ROUTES: {
    BASE: 'songs',
    BY_ID: ':id',
  },
  INCLUDE: {
    TAGS: {
      tags: true,
    },
  },
  PRISMA_ERROR_CODES: {
    UNIQUE_CONSTRAINT: 'P2002',
    RECORD_NOT_FOUND: 'P2025',
  },
} as const;
