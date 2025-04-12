import { Injectable, NotFoundException, BadRequestException, Inject, forwardRef } from '@nestjs/common';
import { Personagem } from '../interfaces/personagem.interface';
import { ItemMagico } from '../interfaces/itemMagico.interface';
import { v4 as uuidv4 } from 'uuid';
import { CreatePersonagemDto } from './create-personagem.dto';
import { UpdatePersonagemDto } from './update-personagem.dto';
import { ItemMagicoService } from '../itemMagico/itemMagico.service';

@Injectable()
export class PersonagemService {
  private readonly personagens: Personagem[] = [];

  constructor(
    @Inject(forwardRef(() => ItemMagicoService))
    private readonly itemMagicoService: ItemMagicoService,
  ) {}

  // Método para calcular os atributos totais (base + itens)
  private calcularAtributosTotais(personagem: Personagem): { forcaTotal: number; defesaTotal: number } {
    const totaisItens = personagem.itens.reduce(
      (acumulador, item: ItemMagico) => ({
        forcaTotal: acumulador.forcaTotal + item.forca,
        defesaTotal: acumulador.defesaTotal + item.defesa,
      }),
      { forcaTotal: 0, defesaTotal: 0 },
    );

    return {
      forcaTotal: personagem.forca + totaisItens.forcaTotal,
      defesaTotal: personagem.defesa + totaisItens.defesaTotal,
    };
  }

  create(createPersonagemDto: CreatePersonagemDto): Personagem {
    const { itens, forca, defesa, ...personagemData } = createPersonagemDto;

    if (forca + defesa > 10) {
      throw new BadRequestException('A soma de Força e Defesa não pode ultrapassar 10 pontos.');
    }

    const novoPersonagem: Personagem = {
      id: uuidv4(),
      ...personagemData,
      forca,
      defesa,
      itens: [],
    };

    if (itens && itens.length > 0) {
      novoPersonagem.itens = itens.map((item) =>
        this.itemMagicoService.create({ ...item, personagemId: novoPersonagem.id }),
      );
    }

    this.personagens.push(novoPersonagem);
    return novoPersonagem;
  }

  findAll(): Personagem[] {
    // Para cada personagem, adiciona os atributos totais calculados
    return this.personagens.map((p) => {
      const totais = this.calcularAtributosTotais(p);
      return { ...p, ...totais };
    });
  }

  findById(id: string): Personagem {
    const personagem = this.personagens.find((p) => p.id === id);
    if (!personagem) {
      throw new NotFoundException(`Personagem com ID ${id} não encontrado.`);
    }
    const totais = this.calcularAtributosTotais(personagem);
    return { ...personagem, ...totais };
  }

  update(id: string, updateData: UpdatePersonagemDto): Personagem {
    const personagemIndex = this.personagens.findIndex((p) => p.id === id);
    if (personagemIndex === -1) {
      throw new NotFoundException(`Personagem com ID ${id} não encontrado.`);
    }

    const { itens, ...resto } = updateData;

    let itensAtualizados: ItemMagico[] | undefined = undefined;
    if (itens) {
      // Neste exemplo, novos itens serão criados – se desejar integrações mais sofisticadas, adapte conforme necessário.
      itensAtualizados = itens.map((item) =>
        this.itemMagicoService.create({ ...item, personagemId: id }),
      );
    }

    const personagemAtualizado: Personagem = {
      ...this.personagens[personagemIndex],
      ...resto,
      itens: itensAtualizados ?? this.personagens[personagemIndex].itens,
    };

    this.personagens[personagemIndex] = personagemAtualizado;
    return personagemAtualizado;
  }

  remove(id: string): void {
    const personagemIndex = this.personagens.findIndex((p) => p.id === id);
    if (personagemIndex === -1) {
      throw new NotFoundException(`Personagem com ID ${id} não encontrado.`);
    }

    this.personagens.splice(personagemIndex, 1);
  }
}