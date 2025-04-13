import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { PersonagemService } from './personagem.service';
import { CreatePersonagemDto } from './create-personagem.dto';
import { Personagem } from '../interfaces/personagem.interface';
import { ItemMagico } from '../interfaces/itemMagico.interface';

@ApiTags('Personagens')
@Controller('personagem')
export class PersonagemController {
  constructor(private readonly personagemService: PersonagemService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Lista todos os personagens.' })
  findAll(): Personagem[] {
    return this.personagemService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'ID do personagem' })
  @ApiResponse({ status: 200, description: 'Retorna o personagem pelo ID.' })
  findById(@Param('id') id: string): Personagem {
    return this.personagemService.findById(id);
  }

  @Post()
  @ApiBody({ type: CreatePersonagemDto })
  @ApiResponse({ status: 201, description: 'Cria um novo personagem.' })
  create(@Body() createPersonagemDto: CreatePersonagemDto): Personagem {
    return this.personagemService.create(createPersonagemDto);
  }

  @Put(':id/nome-aventureiro')
  @ApiParam({ name: 'id', description: 'ID do personagem' })
  @ApiBody({ schema: { example: { nomeAventureiro: 'Tharion, o Valente' } } })
  @ApiResponse({ status: 200, description: 'Atualiza o nome aventureiro do personagem.' })
  updateNomeAventureiro(
    @Param('id') id: string,
    @Body('nomeAventureiro') nomeAventureiro: string,
  ): Personagem {
    return this.personagemService.updateNomeAventureiro(id, nomeAventureiro);
  }

  @Get(':id/itens')
  @ApiParam({ name: 'id', description: 'ID do personagem' })
  @ApiResponse({ status: 200, description: 'Lista os itens mágicos do personagem.' })
  listarItensMagicos(@Param('id') id: string): ItemMagico[] {
    return this.personagemService.listarItensMagicos(id);
  }

  @Get(':id/amuleto')
  @ApiParam({ name: 'id', description: 'ID do personagem' })
  @ApiResponse({ status: 200, description: 'Busca o amuleto do personagem.' })
  buscarAmuleto(@Param('id') id: string): ItemMagico {
    return this.personagemService.buscarAmuleto(id);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'ID do personagem' })
  @ApiResponse({ status: 200, description: 'Remove o personagem pelo ID.' })
  remove(@Param('id') id: string): { message: string } {
    this.personagemService.remove(id);
    return { message: `Personagem com ID ${id} foi removido com sucesso.` };
  }
}
