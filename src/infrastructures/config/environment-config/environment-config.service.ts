import { DatabaseConfig } from '@/domain/config/database.interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentConfigService implements DatabaseConfig {
  constructor(private configService: ConfigService) {}

  getDatabasePath(): string {
    return this.configService.get<string>('DATABASE_PATH');
  }
}
