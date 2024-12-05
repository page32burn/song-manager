export const SWAGGER = {
  TAGS: {
    TAGS: 'songs',
    OPERATIONS: {
      GET_ALL: 'タグ一覧取得',
      CREATE: 'タグ作成',
      UPDATE: 'タグ更新',
      DELETE: 'タグ削除',
    },
    RESPONSES: {
      GET_ALL_SUCCESS: 'タグ一覧の取得に成功',
      CREATE_SUCCESS: 'タグの作成に成功',
      UPDATE_SUCCESS: 'タグの更新に成功',
      DELETE_SUCCESS: 'タグの削除に成功',
      NOT_FOUND: '指定されたIDのタグが見つかりません',
      BAD_REQUEST: '無効なリクエストデータ',
    },
  },
} as const;
