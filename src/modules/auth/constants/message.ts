export const MESSAGES = {
  USERS: {
    ERRORS: {
      GET_FAILED: 'ユーザーの取得に失敗しました',
      GET_ONE_FAILED: 'ユーザーの取得に失敗しました',
      CREATE_FAILED: 'ユーザーの作成に失敗しました',
      UPDATE_FAILED: 'ユーザーの更新に失敗しました',
      DELETE_FAILED: 'ユーザーの削除に失敗しました',
      NOT_FOUND: (id: string) => `ID: ${id} のユーザーが見つかりません`,
      DUPLICATE_NAME: '同じユーザーの楽曲が既に存在します',
      DUPLICATE_EMAIL: '同じメールアドレスのユーザーが既に存在します',
    },
    SUCCESS: {
      CREATED: 'ユーザーを作成しました',
      UPDATED: 'ユーザーを更新しました',
      DELETED: 'ユーザーを削除しました',
    },
  },
} as const;
