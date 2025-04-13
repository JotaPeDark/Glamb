import { Injectable, NotFoundException, BadRequestException, Inject, forwardRef } from '@nestjs/common';
import { Personagem } from '../interfaces/personagem.interface';
import { ItemMagico } from '../interfaces/itemMagico.interface';
import { v4 as uuidv4 } from 'uuid';
import { CreatePersonagemDto } from './create-personagem.dto';
import { ItemMagicoService } from '../itemMagico/itemMagico.service';

@Injectable()
export class PersonagemService {
  private readonly personagens: Personagem[] = [];

  constructor(
    @Inject(forwardRef(() => ItemMagicoService))
    private readonly itemMagicoService: ItemMagicoService,
  ) { }

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
    const { itens, forca, defesa, classe, ...personagemData } = createPersonagemDto;

    if (forca + defesa > 10) {
      throw new BadRequestException('A soma de Força e Defesa não pode ultrapassar 10 pontos.');
    }

    if (!['Guerreiro', 'Mago', 'Arqueiro', 'Ladino', 'Bardo'].includes(classe)) {
      throw new BadRequestException(
        'A classe deve ser uma das seguintes: Guerreiro, Mago, Arqueiro, Ladino ou Bardo.',
      );
    }

    const novoPersonagem: Personagem = {
      id: uuidv4(),
      ...personagemData,
      classe: classe as 'Guerreiro' | 'Mago' | 'Arqueiro' | 'Ladino' | 'Bardo', // Garantindo o tipo correto
      forca,
      defesa,
      itens: [],
    };

    if (itens && itens.length > 0) {
      const amuletos = itens.filter((item) => item.tipo === 'Amuleto');
      if (amuletos.length > 1) {
        throw new BadRequestException('O personagem só pode possuir 1 item mágico do tipo Amuleto.');
      }

      novoPersonagem.itens = itens.map((item) =>
        this.itemMagicoService.create({ ...item, personagemId: novoPersonagem.id }),
      );
    }

    this.personagens.push(novoPersonagem);
    return novoPersonagem;
  }

  findAll(): Personagem[] {
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

  updateNomeAventureiro(id: string, nomeAventureiro: string): Personagem {
    const personagem = this.findById(id);
    personagem.nomeAventureiro = nomeAventureiro;
    return personagem;
  }

  listarItensMagicos(id: string): ItemMagico[] {
    const personagem = this.findById(id);
    return personagem.itens;
  }

  buscarAmuleto(id: string): ItemMagico {
    const personagem = this.findById(id);
    const amuleto = personagem.itens.find((item) => item.tipo === 'Amuleto');
    if (!amuleto) {
      throw new NotFoundException('Nenhum amuleto encontrado para este personagem.');
    }
    return amuleto;
  }

  remove(id: string): void {
    const personagemIndex = this.personagens.findIndex((p) => p.id === id);
    if (personagemIndex === -1) {
      throw new NotFoundException(`Personagem com ID ${id} não encontrado.`);
    }

    this.personagens.splice(personagemIndex, 1);
  }
}