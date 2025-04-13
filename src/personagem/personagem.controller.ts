import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PersonagemService } from './personagem.service';
import { CreatePersonagemDto } from './create-personagem.dto';
import { Personagem } from '../interfaces/personagem.interface';
import { ItemMagico } from '../interfaces/itemMagico.interface';

@Controller('personagem')
export class PersonagemController {
  constructor(private readonly personagemService: PersonagemService) { }

  @Get()
  findAll(): Personagem[] {
    return this.personagemService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Personagem {
    return this.personagemService.findById(id);
  }

  @Post()
  create(@Body() createPersonagemDto: CreatePersonagemDto): Personagem {
    return this.personagemService.create(createPersonagemDto);
  }

  @Put(':id/nome-aventureiro')
  updateNomeAventureiro(
    @Param('id') id: string,
    @Body('nomeAventureiro') nomeAventureiro: string,
  ): Personagem {
    return this.personagemService.updateNomeAventureiro(id, nomeAventureiro);
  }

  @Get(':id/itens')
  listarItensMagicos(@Param('id') id: string): ItemMagico[] {
    return this.personagemService.listarItensMagicos(id);
  }

  @Get(':id/amuleto')
  buscarAmuleto(@Param('id') id: string): ItemMagico {
    return this.personagemService.buscarAmuleto(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): { message: string } {
    this.personagemService.remove(id);
    return { message: `Personagem com ID ${id} foi removido com sucesso.` };
  }
}