import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ItemMagicoService } from './itemMagico.service';
import { CreateItemMagicoDto } from './create-itemMagico.dto';
import { ItemMagico } from '../interfaces/itemMagico.interface';

@Controller('item-magico')
export class ItemMagicoController {
  constructor(private readonly itemMagicoService: ItemMagicoService) {}

  @Get()
  findAll(): ItemMagico[] {
    return this.itemMagicoService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): ItemMagico {
    return this.itemMagicoService.findById(id);
  }

  @Post()
  create(@Body() createItemMagicoDto: CreateItemMagicoDto): ItemMagico {
    return this.itemMagicoService.create(createItemMagicoDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateItemMagicoDto: Partial<CreateItemMagicoDto>,
  ): ItemMagico {
    return this.itemMagicoService.update(id, updateItemMagicoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): { message: string } {
    this.itemMagicoService.remove(id);
    return { message: `Item mágico com ID ${id} foi removido com sucesso.` };
  }
}