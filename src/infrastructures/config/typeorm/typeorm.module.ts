import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { EnvironmentConfigService } from '../environment-config/environment-config.service'
import { Module } from '@nestjs/common'
import { EnvironmentConfigModule } from '../environment-config/environment-config.module'
import 'dotenv/config'

export const getTypeOrmModuleOptions = (
  config: EnvironmentConfigService
): TypeOrmModuleOptions =>
  ({
    type: 'sqlite',
    database: config.getDatabasePath(),
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    synchronize: true,
    autoLoadEntities: true,
    migrationsRun: true,
    migrations: [__dirname + '/../../database/migrations/*{.ts,.js}']
  }) as TypeOrmModuleOptions
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: getTypeOrmModuleOptions
    })
  ]
})
export class TypeOrmConfigModule {}
