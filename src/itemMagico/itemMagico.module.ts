import { Module, forwardRef } from '@nestjs/common';
import { ItemMagicoService } from './itemMagico.service';
import { ItemMagicoController } from './itemMagico.controller';
import { PersonagemModule } from '../personagem/personagem.module';

@Module({
  imports: [forwardRef(() => PersonagemModule)],
  controllers: [ItemMagicoController],
  providers: [ItemMagicoService],
  exports: [ItemMagicoService],
})
export class ItemMagicoModule {}