export interface ItemMagico {
    id: string;
    nome: string;
    raridade: string;
    descricao: string;
    personagemId: string; // ID do personagem ao qual o item pertence
  }