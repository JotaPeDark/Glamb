import { Module } from '@nestjs/common';
import { PersonagemController } from './personagem/personagem.controller';
import { PersonagemService } from './personagem/personagem.service';
import { PersonagemModule } from './personagem/personagem.module';
import { ItemMagicoController } from './itemMagico/itemMagico.controller';
import { ItemMagicoService } from './itemMagico/itemMagico.service';
import { ItemMagicoModule } from './itemMagico/itemMagico.module';

@Module({
  imports: [PersonagemModule, ItemMagicoModule],
  controllers: [PersonagemController, ItemMagicoController],
  providers: [PersonagemService, ItemMagicoService],
})
export class AppModule {}
