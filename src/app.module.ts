import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorData } from './sensor-data.entity';
import { SensorDataRepository } from './sensor-data.repository';
import { MqttController } from './mqtt.controller';
import { LedStatus } from './ledstatus.entity';
import { LedStatusRepository } from './ledstatus.repository';
import { LedController } from './ledstatus.controller';
import { FanStatus } from './fanstatus.entity';
import { FanStatusRepository } from './fanstatus.repository';
import { FanController } from './fanstatus.controller';
import { MqttService } from './mqtt.service';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: 'localhost',
			username: 'root',
			password: 'root',
			database: 'iot-db',
			entities: [SensorData, LedStatus, FanStatus],
			synchronize: true,
		}),
		TypeOrmModule.forFeature([SensorData, SensorDataRepository, LedStatus, LedStatusRepository, FanStatus, FanStatusRepository])
	],
	controllers: [AppController, MqttController, LedController, FanController],
	providers: [AppService, MqttService],
})
export class AppModule {}
