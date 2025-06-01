import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthRolesGuard } from 'src/users/guards/auth-roles.guard';
import { RolesUser } from 'src/users/decorators/user-role.decorator';
import { Roles } from 'src/utils/common/user-roles.enum';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create')
    @RolesUser(Roles.ADMIN)
    @UseGuards(AuthRolesGuard)
  create(@Body() createCategoryDto: CreateCategoryDto, @Req() req: Request) {
    console.log('hi');
    
    return this.categoryService.create(createCategoryDto,req['user']);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get('single/:id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
