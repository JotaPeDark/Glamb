export interface ItemMagico {
  id: string;
  nome: string;
  tipo: 'Arma' | 'Armadura' | 'Amuleto';
  forca: number;
  defesa: number;
  personagemId: string;
}