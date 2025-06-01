import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { ProductService } from 'src/product/product.service';
import { ProductModule } from 'src/product/product.module';
@Module({
  imports:[JwtModule,UsersModule,TypeOrmModule.forFeature([Review]),ProductModule],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
