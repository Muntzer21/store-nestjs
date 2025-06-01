import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { RolesUser } from 'src/users/decorators/user-role.decorator';
import { AuthRolesGuard } from 'src/users/guards/auth-roles.guard';
import { Roles } from 'src/utils/common/user-roles.enum';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

    @Post('create')
      @RolesUser(Roles.USER)
      @UseGuards(AuthRolesGuard)
  @Post('add-product')
    create(@Body() createProductDto: CreateProductDto, @CurrentUser() user ) {
      // console.log(req['user']);
      
    return this.productService.create(createProductDto,user);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get('single/:id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
