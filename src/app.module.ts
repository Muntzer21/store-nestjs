import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseProviders } from 'db/data-source';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { OrderModule } from './order/order.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    databaseProviders,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.development',
    }),
    UsersModule,
    CategoryModule,
    ProductModule,
    ReviewModule,
    OrderModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
