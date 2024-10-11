import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from 'src/domain/config/database.interface';

@Injectable()
export class EnvironmentConfigService implements DatabaseConfig {
  constructor(private configService: ConfigService) {}

  getDatabasePath(): string {
    return this.configService.get<string>('DATABASE_PATH');
  }
  getDatabaseType(): string {
    return this.configService.get<string>('DATABASE_TYPE');
  }
}
