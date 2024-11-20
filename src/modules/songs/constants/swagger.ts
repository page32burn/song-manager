import { SWAGGER_CONSTANTS } from './swagger_constant';
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
};
