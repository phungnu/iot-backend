import { Controller, Get } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as mqtt from 'mqtt';
import { config } from './config';

import { FanStatus } from './fanstatus.entity';

@Controller('fanstatus')
export class FanController {
  constructor(
    @InjectRepository(FanStatus)
    private lightStatusRepository: Repository<FanStatus>,
  ) {
    const client = mqtt.connect(config.mqtt_server);
    client.subscribe('FAN');
    client.on('message', (topic, message) => {
      if (topic === 'FAN') {
        const status = message.toString();
        console.log(`Received FAN status: ${status}`);
        
        // Lưu trạng thái quạt vào cơ sở dữ liệu
        const lightStatus = new FanStatus();
        lightStatus.status = status;
        lightStatus.timestamp = new Date();
        this.lightStatusRepository.save(lightStatus);
      }
    });
  }

  @Get('/getAll')
  async getAllLedStatus(): Promise<FanStatus[]> {
    return this.lightStatusRepository.find();
  }
}
