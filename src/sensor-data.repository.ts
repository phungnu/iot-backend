// temperature-data.repository.ts
import { EntityRepository, Repository } from 'typeorm';
import { SensorData } from './sensor-data.entity';

@EntityRepository(SensorData)
export class SensorDataRepository extends Repository<SensorData> {}
