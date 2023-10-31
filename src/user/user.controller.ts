import { Body, Controller, Post, Get, Patch, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './DTO/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: UserDTO) {
    return this.userService.create(data);
  }

  @Patch()
  async updatePassword(@Body() data: UserDTO) {
    return this.userService.updatePassword(data.id, data.password);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get('/:id')
  async findById(@Param('id') id: number) {
    return this.userService.findById(id);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}