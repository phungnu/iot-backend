import { Controller, Get } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as mqtt from 'mqtt';
import { config } from './config';

import { LedStatus } from './ledstatus.entity';

@Controller('ledstatus')
export class LedController {
  constructor(
    @InjectRepository(LedStatus)
    private lightStatusRepository: Repository<LedStatus>,
  ) {
    const client = mqtt.connect(config.mqtt_server);
    client.subscribe('LED');
    client.on('message', (topic, message) => {
      if (topic === 'LED') {
        const status = message.toString();
        console.log(`Received LED status: ${status}`);
        
        // Lưu trạng thái đèn vào cơ sở dữ liệu
        const lightStatus = new LedStatus();
        lightStatus.status = status;
        lightStatus.timestamp = new Date();
        this.lightStatusRepository.save(lightStatus);
      }
    });
  }

  @Get('/getAll')
  async getAllLedStatus(): Promise<LedStatus[]> {
    return this.lightStatusRepository.find();
  }
  
}
