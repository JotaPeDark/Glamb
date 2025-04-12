import { ItemMagico } from './itemMagico.interface';

export interface Personagem {
  id: string;
  nome: string;
  classe: string;
  nivel: number;
  itens?: ItemMagico[];
}