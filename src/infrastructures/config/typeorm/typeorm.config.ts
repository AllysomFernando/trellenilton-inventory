import { DataSource } from 'typeorm'
import 'dotenv/config'


const config = new DataSource({
  type: 'sqlite',
  database:  process.env.DATABASE_PATH,
  entities: [__dirname + './../../**/*.entity{.ts}'],
  synchronize: true,
  migrationsRun: true,
  migrations: [__dirname + '/migrations/**/*{.ts}'],
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
