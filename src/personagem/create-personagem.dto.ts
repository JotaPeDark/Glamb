import { IsString, IsInt, Min, Max, IsOptional, ValidateNested, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateItemMagicoDto } from '../itemMagico/create-itemMagico.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePersonagemDto {
  @ApiProperty({ example: 'João Silva' })
  @IsString()
  nome: string;

  @ApiProperty({ example: 'Tharion, o Bravo' })
  @IsString()
  nomeAventureiro: string;

  @ApiProperty({
    example: 'Guerreiro',
    enum: ['Guerreiro', 'Mago', 'Arqueiro', 'Ladino', 'Bardo'],
    description: 'Classe do personagem',
  })
  @IsString()
  @IsIn(['Guerreiro', 'Mago', 'Arqueiro', 'Ladino', 'Bardo'], {
    message: 'A classe deve ser uma das seguintes: Guerreiro, Mago, Arqueiro, Ladino ou Bardo.',
  })
  classe: string;

  @ApiProperty({ example: 5, minimum: 1 })
  @IsInt()
  @Min(1)
  nivel: number;

  @ApiProperty({ example: 7, minimum: 0, maximum: 10 })
  @IsInt()
  @Min(0)
  @Max(10)
  forca: number;

  @ApiProperty({ example: 6, minimum: 0, maximum: 10 })
  @IsInt()
  @Min(0)
  @Max(10)
  defesa: number;

  @ApiPropertyOptional({ type: [CreateItemMagicoDto] })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateItemMagicoDto)
  itens?: CreateItemMagicoDto[];
}
