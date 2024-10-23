import { DataSource } from 'typeorm'
import 'dotenv/config'
const config = new DataSource({
  type: 'sqlite',
  database: process.env.DATABASE_PATH,
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  synchronize: true,
  migrationsRun: true,
  migrations: [__dirname + '/../../database/migrations/*{.ts,.js}']
})

async function initializeDatabase() {
  try {
    await config.initialize()
    console.log('Database initialized')

    await config.runMigrations()
    console.log('Migrations have been run')
  } catch (error) {
    console.error('Error initializing database', error)
  }
}

initializeDatabase()

export default config
