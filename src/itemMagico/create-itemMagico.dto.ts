import { IsString, IsInt, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateItemMagicoDto {
  @ApiProperty({ example: 'Espada Flamejante' })
  @IsString()
  nome: string;

  @ApiProperty({ example: 'Arma', enum: ['Arma', 'Armadura', 'Amuleto'] })
  @IsString()
  tipo: 'Arma' | 'Armadura' | 'Amuleto';

  @ApiProperty({ example: 8, minimum: 0, maximum: 10 })
  @IsInt()
  @Min(0)
  @Max(10)
  forca: number;

  @ApiProperty({ example: 3, minimum: 0, maximum: 10 })
  @IsInt()
  @Min(0)
  @Max(10)
  defesa: number;

  @ApiProperty({ example: 'uuid-do-personagem' })
  @IsString()
  personagemId: string;
}
