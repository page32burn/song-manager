export const SWAGGER_CONSTANTS = {
  SONGS: {
    TAGS: 'songs',
    OPERATIONS: {
      GET_ALL: '全ての楽曲を取得',
      GET_ONE: '指定したIDの楽曲を取得',
      CREATE: '新しい楽曲を作成',
      UPDATE: '指定したIDの楽曲を更新',
      DELETE: '指定したIDの楽曲を削除',
    },
    RESPONSES: {
      GET_ALL_SUCCESS: '楽曲一覧の取得に成功',
      GET_ONE_SUCCESS: '楽曲の取得に成功',
      CREATE_SUCCESS: '楽曲の作成に成功',
      UPDATE_SUCCESS: '楽曲の更新に成功',
      DELETE_SUCCESS: '楽曲の削除に成功',
      NOT_FOUND: '指定されたIDの楽曲が見つかりません',
      BAD_REQUEST: '無効なリクエストデータ',
    },
  },
} as const;
