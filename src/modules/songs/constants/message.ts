export const MESSAGES = {
  SONGS: {
    ERRORS: {
      GET_FAILED: '楽曲の取得に失敗しました',
      GET_ONE_FAILED: '楽曲の取得に失敗しました',
      CREATE_FAILED: '楽曲の作成に失敗しました',
      UPDATE_FAILED: '楽曲の更新に失敗しました',
      DELETE_FAILED: '楽曲の削除に失敗しました',
      NOT_FOUND: (id: string) => `ID: ${id} の楽曲が見つかりません`,
      DUPLICATE_NAME: '同じ名前の楽曲が既に存在します',
      TAG_NOT_FOUND: '指定されたタグが存在しません',
    },
    SUCCESS: {
      CREATED: '楽曲を作成しました',
      UPDATED: '楽曲を更新しました',
      DELETED: '楽曲を削除しました',
    },
  },
} as const;
