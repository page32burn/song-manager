## セットアップ
```bash
$ npm install
```

```bash
docker compose up -d --build
```

envファイルを作成し、下記を追記
```
DATABASE_URL="mysql://root:password@mysql_db:3306/database"
```

```bash
docker compose up
```

## prisma
コンテナに入る
```bash
docker exec -it <コンテナID> sh
```

インストール
```bash
npm install --save-dev prisma
```

Prismaの初期化
```bash
npx prisma init
```

Prisma マイグレーションを実行
```bash
npx prisma migrate dev --name <マイグレーション名>
```

Prisma Clientの再生成
```
npx prisma generate
```

## mysql
```bash
docker exec -it <mysqlのコンテナID> sh
```

```bash
mysql -u root -p
```

