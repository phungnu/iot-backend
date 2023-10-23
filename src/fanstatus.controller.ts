import { Controller } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as mqtt from 'mqtt';

import { FanStatus } from './fanstatus.entity';

@Controller('fanstatus')
export class FanController {
  constructor(
    @InjectRepository(FanStatus)
    private lightStatusRepository: Repository<FanStatus>,
  ) {
    const client = mqtt.connect('mqtt://192.168.1.103');
    client.subscribe('FAN');
    client.on('message', (topic, message) => {
      if (topic === 'FAN') {
        const status = message.toString();
        console.log(`Received FAN status: ${status}`);
        
        // Lưu trạng thái đèn vào cơ sở dữ liệu
        const lightStatus = new FanStatus();
        lightStatus.status = status;
        lightStatus.timestamp = new Date();
        this.lightStatusRepository.save(lightStatus);
      }
    });
  }
}
