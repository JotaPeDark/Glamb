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
        const itemIndex = this.itensMagicos.findIndex((i) => i.id === id);
        if (itemIndex === -1) {
            throw new NotFoundException(`Item mágico com ID ${id} não encontrado.`);
        }

        const { personagemId, ...item } = updateData;

        if (personagemId === undefined) {
            throw new BadRequestException('O personagemId é obrigatório ao atualizar um item mágico.');
        }

        const itemAtualizado = {
            ...this.itensMagicos[itemIndex],
            ...item,
            personagemId,
        };

        this.itensMagicos[itemIndex] = itemAtualizado;
        return itemAtualizado;
    }

    remove(id: string): void {
        const itemIndex = this.itensMagicos.findIndex((i) => i.id === id);
        if (itemIndex === -1) {
            throw new NotFoundException(`Item mágico com ID ${id} não encontrado.`);
        }

        this.itensMagicos.splice(itemIndex, 1);
    }
}