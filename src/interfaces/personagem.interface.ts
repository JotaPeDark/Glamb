import { ItemMagico } from './itemMagico.interface';

export interface Personagem {
  id: string;
  nome: string;
  classe: string;
  nivel: number;
  forca: number;
  defesa: number;
  itens: ItemMagico[];
  forcaTotal?: number;
  defesaTotal?: number;
}