import { Module } from '@nestjs/common';
import { ItemMagicoController } from './itemMagico.controller';
import { ItemMagicoService } from './itemMagico.service';

@Module({
  controllers: [ItemMagicoController],
  providers: [ItemMagicoService],
})
export class ItemMagicoModule {}