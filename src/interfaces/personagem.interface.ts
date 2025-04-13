import { ItemMagico } from './itemMagico.interface';

export interface Personagem {
  id: string;
  nome: string;
  nomeAventureiro: string;
  classe: 'Guerreiro' | 'Mago' | 'Arqueiro' | 'Ladino' | 'Bardo';
  nivel: number;
  forca: number;
  defesa: number;
  itens: ItemMagico[];
}