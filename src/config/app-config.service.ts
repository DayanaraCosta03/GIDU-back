import { ConfigService } from '@nestjs/config';

import { AppConfigI, DatabaseConfig } from './app-config.type';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppConfigService implements AppConfigI {
  constructor(private readonly configService: ConfigService) {}

  get APP_NAME(): string {
    return this.configService.get<string>('APP_NAME') || 'Cerberus Auth';
  }

  get PORT(): number {
    const port = this.configService.get<number>('PORT');
    return Number(port) || 8000;
  }

  get GLOBAL_PREFIX(): string {
    return 'api';
  }

  get CONTENT_SECURITY_POLICY(): boolean {
    return (
      this.parseBoolean(
        this.configService.get<string>('CONTENT_SECURITY_POLICY'),
      ) || false
    );
  }

  get PRODUCTION(): boolean {
    return (
      this.parseBoolean(this.configService.get<string>('PRODUCTION')) || false
    );
  }

  // KEYS

  get COOKIE_KEY(): string {
    return this.configService.get<string>('COOKIE_KEY') || 'default_cookie_key';
  }

  get JWT_SECRET(): string {
    return this.configService.get<string>('JWT_SECRET') || 'default-jwt-secret';
  }

  // CORS

  get CORS_ORIGINS(): string[] {
    const origins = this.parseArrayString(
      this.configService.get<string>('CORS_ORIGINS'),
    );

    return origins || [];
  }

  get CORS_CREDENTIALS(): boolean {
    return (
      this.parseBoolean(this.configService.get<string>('CORS_CREDENTIALS')) ||
      false
    );
  }

  get CORS_METHODS(): string[] {
    const methods = this.parseArrayString(
      this.configService.get<string>('CORS_METHODS'),
    );

    return methods || [];
  }

  // DATABASE

  get DATABASE_CONFIG(): DatabaseConfig {
    return {
      host: this.configService.get<string>('DATABASE_HOST') || 'localhost',
      port: Number(this.configService.get<number>('DATABASE_PORT')) || 3306,
      username: this.configService.get<string>('DATABASE_USER') || 'root',
      password:
        this.configService.get<string>('DATABASE_PASSWORD') || '*******',
      database: this.configService.get<string>('DATABASE_NAME') || 'test',
    };
  }

  // Parsers
  private parseArrayString(value?: string): Array<string> | undefined {
    if (value) return value.split(',');
  }

  private parseBoolean(value?: string): boolean | undefined {
    if (!value) return false;

    return ['1', 'true'].includes(value?.toLocaleLowerCase());
  }
}
