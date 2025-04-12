import { Injectable, Inject, NotFoundException, BadRequestException, forwardRef } from '@nestjs/common';
import { ItemMagico } from '../interfaces/itemMagico.interface';
import { CreateItemMagicoDto } from './create-itemMagico.dto';
import { v4 as uuidv4 } from 'uuid';
import { PersonagemService } from '../personagem/personagem.service';

@Injectable()
export class ItemMagicoService {
  private readonly itensMagicos: ItemMagico[] = [];

  constructor(
    @Inject(forwardRef(() => PersonagemService))
    private readonly personagemService: PersonagemService,
  ) {}

  create(itemData: CreateItemMagicoDto): ItemMagico {
    const { personagemId, ...item } = itemData;

    if (!personagemId) {
      throw new BadRequestException('Todo item mágico deve estar associado a um personagem.');
    }

    const personagem = this.personagemService.findById(personagemId);
    if (!personagem) {
      throw new NotFoundException(`Personagem com ID ${personagemId} não encontrado.`);
    }

    if (!personagem.itens) {
      personagem.itens = [];
    }

    const novoItem: ItemMagico = { id: uuidv4(), personagemId, ...item };
    this.itensMagicos.push(novoItem);
    personagem.itens.push(novoItem);

    return novoItem;
  }

  findAll(): ItemMagico[] {
    return this.itensMagicos;
  }

  findById(id: string): ItemMagico {
    const item = this.itensMagicos.find((i) => i.id === id);
    if (!item) {
      throw new NotFoundException(`Item mágico com ID ${id} não encontrado.`);
    }
    return item;
  }

  update(id: string, updateData: Partial<CreateItemMagicoDto>): ItemMagico {
    const index = this.itensMagicos.findIndex(i => i.id === id);
    if (index === -1) {
      throw new NotFoundException(`Item mágico com ID ${id} não encontrado.`);
    }
    const itemExistente = this.itensMagicos[index];
    const updatedItem: ItemMagico = { ...itemExistente, ...updateData };
    
    this.itensMagicos[index] = updatedItem;

    const personagem = this.personagemService.findById(itemExistente.personagemId);
    if (personagem) {
      const idx = personagem.itens.findIndex(i => i.id === id);
      if (idx !== -1) {
        personagem.itens[idx] = updatedItem;
      }
    }
    
    return updatedItem;
  }

  remove(id: string): void {
    const index = this.itensMagicos.findIndex(i => i.id === id);
    if (index === -1) {
      throw new NotFoundException(`Item mágico com ID ${id} não encontrado.`);
    }
    const removedItem = this.itensMagicos[index];
    this.itensMagicos.splice(index, 1);

    const personagem = this.personagemService.findById(removedItem.personagemId);
    if (personagem) {
      const idx = personagem.itens.findIndex(i => i.id === id);
      if (idx !== -1) {
        personagem.itens.splice(idx, 1);
      }
    }
  }
}