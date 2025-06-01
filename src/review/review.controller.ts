import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { AuthGuard } from 'src/users/guards/auth.guard';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(AuthGuard)
  @Post('add-review')
  create(@Body() createReviewDto: CreateReviewDto, @CurrentUser() currentUser) {
    return this.reviewService.create(createReviewDto, currentUser);
  }

  @Get()
  findAll() {
    return this.reviewService.findAll();
  }

  @Get()
  findAllByProduct(@Body('product_id') product_id: number) {
    return this.reviewService.findAllByProduct(product_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update(+id, updateReviewDto);
  }

  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.reviewService.remove(+id);
  }
}
