import { Module, forwardRef } from '@nestjs/common';
import { ItemMagicoService } from './itemMagico.service';
import { ItemMagicoController } from './itemMagico.controller';
import { PersonagemModule } from '../personagem/personagem.module';

@Module({
  imports: [forwardRef(() => PersonagemModule)], // Use forwardRef para evitar circularidade
  controllers: [ItemMagicoController],
  providers: [ItemMagicoService],
  exports: [ItemMagicoService], // Exporte o serviço para que outros módulos possam usá-lo
})
export class ItemMagicoModule {}