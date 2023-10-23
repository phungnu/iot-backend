import { Controller } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as mqtt from 'mqtt';

import { LedStatus } from './ledstatus.entity';

@Controller('ledstatus')
export class LedController {
  constructor(
    @InjectRepository(LedStatus)
    private lightStatusRepository: Repository<LedStatus>,
  ) {
    const client = mqtt.connect('mqtt://192.168.1.103');
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
  
}
