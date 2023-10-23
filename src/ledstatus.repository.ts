import { EntityRepository, Repository } from 'typeorm';
import { LedStatus } from './ledstatus.entity';

@EntityRepository(LedStatus)
export class LedStatusRepository extends Repository<LedStatus> {}
