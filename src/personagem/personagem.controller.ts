
import { Controller, Get, Query, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CreatePersonagemDto } from './personagem.dto';
import { Personagem } from '../interfaces/personagem.interface';
import { PersonagemService } from './personagem.service';

@Controller('Personagem')
export class PersonagemController {
  constructor(private PersonagemsService: PersonagemService) {}

  @Post()
  async create(@Body() createPersonagemDto: CreatePersonagemDto) {
    this.PersonagemsService.create(createPersonagemDto);
  }

  @Get()
  async findAll(): Promise<Personagem[]> {
    return this.PersonagemsService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string) {
    return `This action updates a #${id} Personagem`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} Personagem`;
  }
}
