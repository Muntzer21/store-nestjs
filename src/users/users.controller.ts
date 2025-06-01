import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignUpDto } from './dto/sign-up-dto';
import { SignInDto } from './dto/sign-in-dto';
// import { AuthGuard } from './guards/auth.guard';
import { RolesUser } from './decorators/user-role.decorator';
import { Roles } from 'src/utils/common/user-roles.enum';
import { AuthRolesGuard } from './guards/auth-roles.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import {AuthGuard} from '@nestjs/passport'
import { ChangePasswordDto } from './dto/change-password.dto';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('sign-up')
  signup(@Body() signupDto: SignUpDto) {
    return this.usersService.signup(signupDto);
  }

  @Post('sign-in')
  signin(@Body() signupDto: SignInDto) {
    return this.usersService.signin(signupDto);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // @RolesUser(Roles.ADMIN)
  // @UseGuards(AuthRolesGuard)
  @Get('all')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('single/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Get('current-user')
  // @UseGuards(AuthGuard)
  currentUser(@CurrentUser() user) {
    const user_id = user.id;
    return this.usersService.findOne(user_id);
  }

  //http://localhost:3000/api/v1/users/google/login
  @Get('google/login')
  @UseGuards(AuthGuard('google'))
  googleLogin(@Req() res: any,@Res() resp : any) {
    return resp;
  }

  // http://localhost:3000/api/v1/users/google/callback
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleCallback(@Req() res: any) {
    const user = res.user;
    
    return this.usersService.logGoogle(user)
  }

  @Patch('change-password')
    async changePassword(@Body() changePaasword : ChangePasswordDto@CurrentUser() currentUser)
  {
    const userId = currentUser.id;
    return this.usersService.changePassword(changePaasword, userId);
  }
  
  @Post('forgot-password')
  forgotPassword(@Body('email') email: string) {
    return this.usersService.forgotPassword(email);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
