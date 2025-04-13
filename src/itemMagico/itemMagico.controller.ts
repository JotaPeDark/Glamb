import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ItemMagicoService } from './itemMagico.service';
import { CreateItemMagicoDto } from './create-itemMagico.dto';
import { ItemMagico } from '../interfaces/itemMagico.interface';

@ApiTags('Itens Mágicos')
@Controller('item-magico')
export class ItemMagicoController {
  constructor(private readonly itemMagicoService: ItemMagicoService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Lista todos os itens mágicos.' })
  findAll(): ItemMagico[] {
    return this.itemMagicoService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'ID do item mágico' })
  @ApiResponse({ status: 200, description: 'Retorna o item mágico pelo ID.' })
  findById(@Param('id') id: string): ItemMagico {
    return this.itemMagicoService.findById(id);
  }

  @Post()
  @ApiBody({ type: CreateItemMagicoDto })
  @ApiResponse({ status: 201, description: 'Cria um novo item mágico.' })
  create(@Body() createItemMagicoDto: CreateItemMagicoDto): ItemMagico {
    return this.itemMagicoService.create(createItemMagicoDto);
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'ID do item mágico' })
  @ApiBody({ type: CreateItemMagicoDto })
  @ApiResponse({ status: 200, description: 'Atualiza os dados do item mágico.' })
  update(
    @Param('id') id: string,
    @Body() updateItemMagicoDto: Partial<CreateItemMagicoDto>,
  ): ItemMagico {
    return this.itemMagicoService.update(id, updateItemMagicoDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'ID do item mágico' })
  @ApiResponse({ status: 200, description: 'Remove o item mágico pelo ID.' })
  remove(@Param('id') id: string): { message: string } {
    this.itemMagicoService.remove(id);
    return { message: `Item mágico com ID ${id} foi removido com sucesso.` };
  }
}
