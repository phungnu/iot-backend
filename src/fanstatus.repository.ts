import { EntityRepository, Repository } from 'typeorm';
import { FanStatus } from './fanstatus.entity';

@EntityRepository(FanStatus)
export class FanStatusRepository extends Repository<FanStatus> {}
