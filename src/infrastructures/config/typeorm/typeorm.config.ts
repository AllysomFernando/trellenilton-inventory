import { DataSource } from 'typeorm';

const config = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  entities: [__dirname + '../../../infrastructures/entities/*{.ts}'],
  synchronize: true,
  migrationsRun: true,
  migrations: [__dirname + '/../../../infrastructures/migrations/*{.ts}'],
});

config
  .initialize()
  .then(() => {
    console.log('Database initialized');
  })
  .catch((error) => {
    console.error('Error initializing database', error);
  });

console.log(config);

export default config;
