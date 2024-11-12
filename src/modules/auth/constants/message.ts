export const MESSAGES = {
  AUTH: {
    ERRORS: {
      CREATE_FAILED: 'ユーザーの作成に失敗しました',
      DUPLICATE_EMAIL: '同じメールアドレスのユーザーが既に存在します',
      USER_NOT_FOUND: 'ユーザーが見つかりません',
      INVALID_PASSWORD: 'パスワードが一致しません',
      TOKEN_GENERATION_FAILED: 'トークンの生成に失敗しました',
      UNEXPECTED_ERROR: 'ログイン処理中に予期しないエラーが発生しました',
    },
  },
} as const;
