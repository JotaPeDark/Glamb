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

  private validarItem(item: CreateItemMagicoDto, personagemId: string): void {
    const { tipo, forca, defesa } = item;

    if (forca === 0 && defesa === 0) {
      throw new BadRequestException('Um item mágico não pode ter Força e Defesa iguais a zero.');
    }

    if (forca > 10 || defesa > 10) {
      throw new BadRequestException('Os atributos Força e Defesa não podem ser maiores que 10.');
    }

    if (tipo === 'Arma' && defesa !== 0) {
      throw new BadRequestException('Itens do tipo Arma devem ter Defesa igual a zero.');
    }

    if (tipo === 'Armadura' && forca !== 0) {
      throw new BadRequestException('Itens do tipo Armadura devem ter Força igual a zero.');
    }

    if (tipo === 'Amuleto') {
      const personagem = this.personagemService.findById(personagemId);
      const amuletosExistentes = personagem.itens.filter((i) => i.tipo === 'Amuleto');
      if (amuletosExistentes.length > 0) {
        throw new BadRequestException('O personagem já possui um item mágico do tipo Amuleto.');
      }
    }
  }

  create(itemData: CreateItemMagicoDto): ItemMagico {
    const { personagemId, ...item } = itemData;

    if (!personagemId) {
      throw new BadRequestException('Todo item mágico deve estar associado a um personagem.');
    }

    const personagem = this.personagemService.findById(personagemId);
    if (!personagem) {
      throw new NotFoundException(`Personagem com ID ${personagemId} não encontrado.`);
    }

    this.validarItem(itemData, personagemId);

    const novoItem: ItemMagico = { id: uuidv4(), personagemId, ...item };
    this.itensMagicos.push(novoItem);
    personagem.itens.push(novoItem);

    return novoItem;
  }

  update(id: string, updateData: Partial<CreateItemMagicoDto>): ItemMagico {
    const index = this.itensMagicos.findIndex((i) => i.id === id);
    if (index === -1) {
      throw new NotFoundException(`Item mágico com ID ${id} não encontrado.`);
    }

    const itemExistente = this.itensMagicos[index];
    const updatedItem: ItemMagico = { ...itemExistente, ...updateData };

    this.validarItem(updatedItem, itemExistente.personagemId);

    this.itensMagicos[index] = updatedItem;

    const personagem = this.personagemService.findById(itemExistente.personagemId);
    if (personagem) {
      const idx = personagem.itens.findIndex((i) => i.id === id);
      if (idx !== -1) {
        personagem.itens[idx] = updatedItem;
      }
    }

    return updatedItem;
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

  remove(id: string): void {
    const index = this.itensMagicos.findIndex((i) => i.id === id);
    if (index === -1) {
      throw new NotFoundException(`Item mágico com ID ${id} não encontrado.`);
    }
    const removedItem = this.itensMagicos[index];
    this.itensMagicos.splice(index, 1);

    const personagem = this.personagemService.findById(removedItem.personagemId);
    if (personagem) {
      const idx = personagem.itens.findIndex((i) => i.id === id);
      if (idx !== -1) {
        personagem.itens.splice(idx, 1);
      }
    }
  }
}