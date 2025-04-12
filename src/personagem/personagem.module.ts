import { Module, forwardRef } from '@nestjs/common';
import { PersonagemService } from './personagem.service';
import { PersonagemController } from './personagem.controller';
import { ItemMagicoModule } from '../itemMagico/itemMagico.module';

@Module({
  imports: [forwardRef(() => ItemMagicoModule)], // Use forwardRef para evitar circularidade
  controllers: [PersonagemController],
  providers: [PersonagemService],
  exports: [PersonagemService], // Exporte o serviço para que outros módulos possam usá-lo
})
export class PersonagemModule {}