import { IsString } from 'class-validator';

export class CreateItemMagicoDto {
  @IsString()
  nome: string;

  @IsString()
  raridade: string;

  @IsString()
  descricao: string;
}