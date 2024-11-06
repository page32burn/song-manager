export const MESSAGES = {
  TAGS: {
    ERRORS: {
      GET_FAILED: 'タグの取得に失敗しました',
      GET_ONE_FAILED: 'タグの取得に失敗しました',
      CREATE_FAILED: 'タグの作成に失敗しました',
      UPDATE_FAILED: 'タグの更新に失敗しました',
      DELETE_FAILED: 'タグの削除に失敗しました',
      NOT_FOUND: (id: string) => `ID: ${id} のタグが見つかりません`,
      DUPLICATE_NAME: '同じ名前のタグが既に存在します',
      TAG_NOT_FOUND: '指定されたタグが存在しません',
    },
    SUCCESS: {
      CREATED: 'タグを作成しました',
      UPDATED: 'タグを更新しました',
      DELETED: 'タグを削除しました',
    },
  },
} as const;
