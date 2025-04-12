import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemMagico } from '../interfaces/itemMagico.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ItemMagicoService {
    private readonly itensMagicos: ItemMagico[] = [];

    create(item: Omit<ItemMagico, 'id'>): ItemMagico {
        const novoItem: ItemMagico = { id: uuidv4(), ...item };
        this.itensMagicos.push(novoItem);
        return novoItem;
    }

    findAll(): ItemMagico[] {
        return this.itensMagicos;
    }

    update(id: string, updateData: Partial<ItemMagico>): ItemMagico {
        const itemIndex = this.itensMagicos.findIndex((i) => i.id === id);
        if (itemIndex === -1) {
            throw new NotFoundException(`Item mágico com ID ${id} não encontrado.`);
        }

        const itemAtualizado = {
            ...this.itensMagicos[itemIndex],
            ...updateData,
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