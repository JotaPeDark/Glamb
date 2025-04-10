
import { Injectable } from '@nestjs/common';
import { Personagem } from '../interfaces/personagem.interface';

@Injectable()
export class PersonagemService {
  private readonly Personagems: Personagem[] = [];

  create(Personagem: Personagem) {
    this.Personagems.push(Personagem);
  }

  findAll(): Personagem[] {
    return this.Personagems;
  }
}
