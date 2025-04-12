import { IsString, IsInt, Min, Max } from 'class-validator';

export class CreateItemMagicoDto {
  @IsString()
  nome: string;

  @IsString()
  tipo: 'Arma' | 'Armadura' | 'Amuleto';

  @IsInt()
  @Min(0)
  @Max(10)
  forca: number;

  @IsInt()
  @Min(0)
  @Max(10)
  defesa: number;

  @IsString()
  personagemId: string;
}