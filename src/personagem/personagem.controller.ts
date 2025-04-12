import { Controller, Get, Query, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CreatePersonagemDto } from './create-personagem.dto';
import { Personagem } from '../interfaces/personagem.interface';
import { PersonagemService } from './personagem.service';

@Controller('personagem')
export class PersonagemController {
  constructor(private readonly personagemService: PersonagemService) {}

  @Post()
  async create(@Body() createPersonagemDto: CreatePersonagemDto): Promise<Personagem> {
    return this.personagemService.create(createPersonagemDto);
  }

  @Get()
  async findAll(): Promise<Personagem[]> {
    return this.personagemService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePersonagemDto: Partial<CreatePersonagemDto>): Promise<Personagem> {
    return this.personagemService.update(id, updatePersonagemDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.personagemService.remove(id);
    return { message: `Personagem com ID ${id} foi removido com sucesso.` };
  }
}