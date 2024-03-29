import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post('/create')
  async create(@Body() createCardDto: CreateCardDto) {
    return await this.cardService.create(createCardDto);
  }

  @Patch('/update/:id')
  async update(@Param('id') id: number, @Body() data: UpdateCardDto) {
    return await this.cardService.update(id, data);
  }

  @Get('/get/:userId')
  async getAll(@Param('userId') userId: number) {
    return await this.cardService.getAll(userId);
  }

  @Delete('/delete/:id/:activitiesId')
  async delete(
    @Param('id') id: number,
    @Param('activitiesId') activitiesId: number,
  ) {
    return await this.cardService.delete(id, activitiesId);
  }
}
