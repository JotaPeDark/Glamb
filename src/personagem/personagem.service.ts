import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { Personagem } from '../interfaces/personagem.interface';
import { ItemMagico } from '../interfaces/itemMagico.interface';
import { v4 as uuidv4 } from 'uuid';
import { CreatePersonagemDto } from './create-personagem.dto';
import { UpdatePersonagemDto } from './update-personagem.dto';
import { ItemMagicoService } from '../itemMagico/itemMagico.service';

@Injectable()
export class PersonagemService {
  private readonly personagens: Personagem[] = [];

  constructor(
    @Inject(forwardRef(() => ItemMagicoService)) // Use forwardRef para resolver a circularidade
    private readonly itemMagicoService: ItemMagicoService,
  ) {}

  // Cria um novo personagem
  create(createPersonagemDto: CreatePersonagemDto): Personagem {
    const { itens, ...personagemData } = createPersonagemDto;
    const novoPersonagem: Personagem = { id: uuidv4(), ...personagemData, itens: [] };

    // Adiciona os itens mágicos, se fornecidos
    if (itens && itens.length > 0) {
      novoPersonagem.itens = itens.map((item) =>
        this.itemMagicoService.create({ ...item, personagemId: novoPersonagem.id }),
      );
    }

    this.personagens.push(novoPersonagem);
    return novoPersonagem;
  }

  // Retorna todos os personagens
  findAll(): Personagem[] {
    return this.personagens;
  }

  // Retorna um personagem específico pelo ID
  findById(id: string): Personagem {
    const personagem = this.personagens.find((p) => p.id === id);
    if (!personagem) {
      throw new NotFoundException(`Personagem com ID ${id} não encontrado.`);
    }
    return personagem;
  }

  // Atualiza um personagem existente
  update(id: string, updateData: UpdatePersonagemDto): Personagem {
    const personagemIndex = this.personagens.findIndex((p) => p.id === id);
    if (personagemIndex === -1) {
      throw new NotFoundException(`Personagem com ID ${id} não encontrado.`);
    }

    const { itens, ...resto } = updateData;

    // Processa os itens mágicos, se fornecidos
    let itensAtualizados: ItemMagico[] | undefined = undefined;
    if (itens) {
      itensAtualizados = itens.map((item) =>
        this.itemMagicoService.create({ ...item, personagemId: id }),
      );
    }

    const personagemAtualizado: Personagem = {
      ...this.personagens[personagemIndex],
      ...resto,
      itens: itensAtualizados ?? this.personagens[personagemIndex].itens, // Mantém os itens existentes se não forem atualizados
    };

    this.personagens[personagemIndex] = personagemAtualizado;
    return personagemAtualizado;
  }

  // Remove um personagem pelo ID
  remove(id: string): void {
    const personagemIndex = this.personagens.findIndex((p) => p.id === id);
    if (personagemIndex === -1) {
      throw new NotFoundException(`Personagem com ID ${id} não encontrado.`);
    }

    this.personagens.splice(personagemIndex, 1);
  }
}