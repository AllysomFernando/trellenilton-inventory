import { DataSource } from 'typeorm'
import 'dotenv/config'

const config = new DataSource({
  type: 'sqlite',
  database: process.env.DATABASE_PATH,
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
  migrations: [__dirname + '/../../database/migrations/*{.ts,.js}']
})

config
  .initialize()
  .then(() => {
    console.log('Database initialized')
  })
  .catch((error) => {
    console.error('Error initializing database', error)
  })

console.log(config)

export default config
