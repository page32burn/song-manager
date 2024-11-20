import { SWAGGER_CONSTANTS } from './swagger_constant';
import { NotFoundErrorDto } from '../dto/not-found-error-dto';
import { SongDto } from '../dto/song-dto';

export const SWAGGER = {
  get: {
    operation: {
      summary: SWAGGER_CONSTANTS.SONGS.OPERATIONS.GET_ALL,
    },
    responses: {
      success: {
        status: 200,
        type: SongDto,
        isArray: true,
      },
      unauthorized: {
        status: 401,
        description: SWAGGER_CONSTANTS.SONGS.MESSAGES.NO_AUTHORIZATION,
      },
      serverError: {
        status: 500,
        description: SWAGGER_CONSTANTS.SONGS.MESSAGES.INTERNAL_SERVER_ERROR,
      },
    },
  },
  show: {
    operation: {
      summary: SWAGGER_CONSTANTS.SONGS.OPERATIONS.GET_ONE,
    },
    responses: {
      success: {
        status: 200,
        type: SongDto,
      },
      unauthorized: {
        status: 401,
        description: SWAGGER_CONSTANTS.SONGS.MESSAGES.NO_AUTHORIZATION,
      },
      notFound: {
        status: 404,
        type: NotFoundErrorDto,
      },
      serverError: {
        status: 500,
        description: SWAGGER_CONSTANTS.SONGS.MESSAGES.INTERNAL_SERVER_ERROR,
      },
    },
  },
  create: {
    operation: {
      summary: SWAGGER_CONSTANTS.SONGS.OPERATIONS.CREATE,
    },
    responses: {
      success: {
        status: 200,
        type: SongDto,
      },
      unauthorized: {
        status: 401,
        description: SWAGGER_CONSTANTS.SONGS.MESSAGES.NO_AUTHORIZATION,
      },
      serverError: {
        status: 500,
        description: SWAGGER_CONSTANTS.SONGS.MESSAGES.INTERNAL_SERVER_ERROR,
      },
    },
  },
  update: {
    operation: {
      summary: SWAGGER_CONSTANTS.SONGS.OPERATIONS.UPDATE,
    },
    responses: {
      success: {
        status: 200,
        type: SongDto,
      },
      unauthorized: {
        status: 401,
        description: SWAGGER_CONSTANTS.SONGS.MESSAGES.NO_AUTHORIZATION,
      },
      notFound: {
        status: 404,
        type: NotFoundErrorDto,
      },
      serverError: {
        status: 500,
        description: SWAGGER_CONSTANTS.SONGS.MESSAGES.INTERNAL_SERVER_ERROR,
      },
    },
  },
  delete: {
    operation: {
      summary: SWAGGER_CONSTANTS.SONGS.OPERATIONS.DELETE,
    },
    responses: {
      success: {
        status: 200,
        type: SongDto,
      },
      unauthorized: {
        status: 401,
        description: SWAGGER_CONSTANTS.SONGS.MESSAGES.NO_AUTHORIZATION,
      },
      notFound: {
        status: 404,
        type: NotFoundErrorDto,
      },
      serverError: {
        status: 500,
        description: SWAGGER_CONSTANTS.SONGS.MESSAGES.INTERNAL_SERVER_ERROR,
      },
    },
  },
};
