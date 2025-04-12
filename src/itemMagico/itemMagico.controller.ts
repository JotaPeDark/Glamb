import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CreateItemMagicoDto } from './create-itemMagico.dto';
import { ItemMagico } from '../interfaces/itemMagico.interface';
import { ItemMagicoService } from './itemMagico.service';

@Controller('item-magico')
export class ItemMagicoController {
  constructor(private readonly itemMagicoService: ItemMagicoService) {}

  @Post()
  async create(@Body() createItemMagicoDto: CreateItemMagicoDto): Promise<ItemMagico> {
    return this.itemMagicoService.create(createItemMagicoDto);
  }

  @Get()
  async findAll(): Promise<ItemMagico[]> {
    return this.itemMagicoService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateItemMagicoDto: Partial<CreateItemMagicoDto>): Promise<ItemMagico> {
    return this.itemMagicoService.update(id, updateItemMagicoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.itemMagicoService.remove(id);
    return { message: `Item mágico com ID ${id} foi removido com sucesso.` };
  }
}