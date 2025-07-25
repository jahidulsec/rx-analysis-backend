# RADIANT RX ANALYSIS API

## Technologies

Backend: HonoJS, NodeJS, Drizzle ORM, TypeScript
Database: MySql

## Run this project

Create `.env` file from `.env.example` file.

To generate `ACCESS_TOKEN_SECRET` key,
Follow same steps to generate `REFRESH_TOKEN_SECRET`.

```bash
openssl rand -base64 32
```

To initiaize project, run

```bash
npm install
npx prisma generate
```

If you are setting new database, run

```bash
npx prisma migrate dev --name init
```

To run on dev server,

```bash
npm run dev
```

For build and move to production

```bash
npm run build
npm run start
```


## Testing

### Create and seed database

Run the following command to create your database.

```bash
npx prisma migrate dev --name init
```

To prepopulate with data,

```bash
npx prisma db seed
```

To create admin user,

```bash
npm run createadmin
```

### Testing the endpoints

The tests can be run using:

```bash
npm test
```
