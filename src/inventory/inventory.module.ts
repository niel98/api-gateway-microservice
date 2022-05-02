import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import * as dotenv from 'dotenv';

dotenv.config()

@Module({
  imports: [ClientsModule.register([
    {
      name: 'INVENTORY_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RMQ_URI],
        queue: 'main_queue',
        queueOptions: {
          durable: false
        }
      }
    },
  ]),],
  controllers: [InventoryController],
  providers: [InventoryService]
})
export class InventoryModule {}
