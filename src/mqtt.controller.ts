// mqtt.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as mqtt from 'mqtt';
import { config } from './config';

import { SensorData } from './sensor-data.entity';
import { MqttService } from './mqtt.service';
import { SendMqttDataDto } from './send-data.dto';

@Controller('mqtt')
export class MqttController {
  constructor(
    @InjectRepository(SensorData)
    private temperatureDataRepository: Repository<SensorData>,
    private readonly mqttService: MqttService
  ) {
    const client = mqtt.connect(config.mqtt_server);
    client.subscribe('data');
    client.on('message', (topic, message) => {
      const data = message.toString().split(',');
      const temperatureData = new SensorData();
      temperatureData.temperature = Number(data[1]);
      temperatureData.humidity = Number(data[2]);
      temperatureData.light = Number(data[0]);
      temperatureData.timestamp = new Date();
      this.temperatureDataRepository.save(temperatureData);
    });
  }

  @Get('/getAll')
  async getAllLedStatus(): Promise<SensorData[]> {
    return this.temperatureDataRepository.find();
  }
  
  @Post('send-data')
  async sendDataToMqtt(@Body() data: SendMqttDataDto) {
    await this.mqttService.publishData(data.topic, data.message);
  }
}
