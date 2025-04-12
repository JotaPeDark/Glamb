import { Module } from '@nestjs/common';
import { PersonagemModule } from './personagem/personagem.module';
import { ItemMagicoModule } from './itemMagico/itemMagico.module';

@Module({
  imports: [PersonagemModule, ItemMagicoModule],
})
export class AppModule {}