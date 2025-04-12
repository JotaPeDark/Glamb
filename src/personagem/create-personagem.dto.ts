import { IsString, IsInt, Min, Max, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateItemMagicoDto } from '../itemMagico/create-itemMagico.dto';

export class CreatePersonagemDto {
  @IsString()
  nome: string;

  @IsString()
  classe: string;

  @IsInt()
  @Min(1)
  nivel: number;

  @IsInt()
  @Min(0)
  @Max(10)
  forca: number;

  @IsInt()
  @Min(0)
  @Max(10)
  defesa: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateItemMagicoDto)
  itens?: CreateItemMagicoDto[];
}