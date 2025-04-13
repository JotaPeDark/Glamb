import { Module, forwardRef } from '@nestjs/common';
import { PersonagemService } from './personagem.service';
import { PersonagemController } from './personagem.controller';
import { ItemMagicoModule } from '../itemMagico/itemMagico.module';

@Module({
  imports: [forwardRef(() => ItemMagicoModule)],
  controllers: [PersonagemController],
  providers: [PersonagemService],
  exports: [PersonagemService],
})
export class PersonagemModule { }