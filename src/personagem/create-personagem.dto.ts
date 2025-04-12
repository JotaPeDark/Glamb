import { IsString, IsInt, Min } from 'class-validator';

export class CreatePersonagemDto {
  @IsString()
  nome: string;

  @IsString()
  classe: string;

  @IsInt()
  @Min(1)
  nivel: number;
}