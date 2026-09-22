import {
  Controller,
  Get,
  Body,
  Param,
  Patch,
  Delete,
  Post,
  // UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { ApiBearerAuth } from '@nestjs/swagger';
// import { Roles } from 'src/auth/roles.decorator';

// import { AuthGuard } from 'src/auth/auth.guard';
// import { RolesGuard } from 'src/auth/roles.guard';

@ApiBearerAuth('JWT')
@Controller('user')
// @UseGuards(AuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  // @Roles(['ADMIN'])
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  // @Roles(['ADMIN'])
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Post()
  // @Roles(['ADMIN'])
  async signupUser(@Body() userData: CreateUserDto) {
    return this.userService.createUser(userData);
  }

  @Patch(':id')
  // @Roles(['ADMIN'])
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(+id, updateUserDto);
  }

  @Delete(':id')
  // @Roles(['ADMIN'])
  remove(@Param('id') id: string) {
    return this.userService.removeUser(+id);
  }
}
