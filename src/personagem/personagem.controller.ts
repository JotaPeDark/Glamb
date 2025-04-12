import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PersonagemService } from './personagem.service';
import { CreatePersonagemDto } from './create-personagem.dto';
import { UpdatePersonagemDto } from './update-personagem.dto';
import { Personagem } from '../interfaces/personagem.interface';

@Controller('personagem')
export class PersonagemController {
  constructor(private readonly personagemService: PersonagemService) {}

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

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePersonagemDto: UpdatePersonagemDto,
  ): Personagem {
    return this.personagemService.update(id, updatePersonagemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): { message: string } {
    this.personagemService.remove(id);
    return { message: `Personagem com ID ${id} foi removido com sucesso.` };
  }
}