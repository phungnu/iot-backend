import { Injectable } from '@nestjs/common';
import * as mqtt from 'mqtt';
import { config } from './config';

@Injectable()
export class MqttService {
  private readonly mqttClient: mqtt.MqttClient;

  constructor() {
    this.mqttClient = mqtt.connect(config.mqtt_server);

    this.mqttClient.on('connect', () => {
      console.log('Connected to MQTT broker');
    });
  }

  async publishData(topic: string, message: string) {
    this.mqttClient.publish(topic, message, (error) => {
      if (error) {
        console.error(`Failed to publish message to topic ${topic}: ${error}`);
      } else {
        console.log(`Published message to topic ${topic}: ${message}`);
      }
    });
  }
}
