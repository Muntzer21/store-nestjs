import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DynamicModule } from '@nestjs/common';

export const databaseProviders: DynamicModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    return {
      type: 'postgres',
      database: config.get<string>('DB_DATABASE'),
      username: config.get<string>('DB_USERNAME'),
      password: config.get<string>('DB_PASSWORD'),
      port: config.get<number>('DB_PORT'),
      host: 'localhost',
      synchronize: true, //only in development envirment
        entities: ['dist/**/*.entity{.ts,.js}'],
      migrations:['dist/db/migrations/*{.js,.ts}']
    };
  },
});
