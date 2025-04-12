import { Injectable, NotFoundException } from '@nestjs/common';
import { Personagem } from '../interfaces/personagem.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PersonagemService {
  private readonly personagens: Personagem[] = [];

  create(personagem: Omit<Personagem, 'id'>): Personagem {
    const novoPersonagem: Personagem = { id: uuidv4(), ...personagem };
    this.personagens.push(novoPersonagem);
    return novoPersonagem;
  }

  findAll(): Personagem[] {
    return this.personagens;
  }

  update(id: string, updateData: Partial<Personagem>): Personagem {
    const personagemIndex = this.personagens.findIndex((p) => p.id === id);
    if (personagemIndex === -1) {
      throw new NotFoundException(`Personagem com ID ${id} não encontrado.`);
    }

    const personagemAtualizado = {
      ...this.personagens[personagemIndex],
      ...updateData,
    };

    this.personagens[personagemIndex] = personagemAtualizado;
    return personagemAtualizado;
  }

  remove(id: string): void {
    const personagemIndex = this.personagens.findIndex((p) => p.id === id);
    if (personagemIndex === -1) {
      throw new NotFoundException(`Personagem com ID ${id} não encontrado.`);
    }

    this.personagens.splice(personagemIndex, 1);
  }
}