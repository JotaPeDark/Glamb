import { IsString, IsInt, Min, IsArray, ValidateNested, IsOptional } from 'class-validator';
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

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateItemMagicoDto)
  itens?: CreateItemMagicoDto[];
}