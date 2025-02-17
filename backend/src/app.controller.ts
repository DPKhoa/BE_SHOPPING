import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './modules-v1/auth/auth.service';
import { Public, User } from './common/decorators/public';
import { LocalAuthGuard } from './common/guards/local-auth.guard';
import { IUser } from './interfaces/common.interface';
import {
  CreateUserDto,
  UserLoginDto,
} from './modules-v1/user/dto/create-user.dto';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: UserLoginDto })
  @Post('/login')
  handleLogin(@User() user: IUser) {
    return this.authService.login(user);
  }

  @Public()
  @Post('/register')
  handleRegister(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
  @Public()
  @Post('/refresh-token')
  getRefreshToken(@Body('token') token: string) {
    return this.authService.refreshToken(token);
  }
  @Public()
  @Get('profile')
  getProfile(@User() user: IUser) {
    return user;
  }
}
