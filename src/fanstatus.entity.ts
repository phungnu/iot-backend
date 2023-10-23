import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: "fanstatus"})
export class FanStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column('timestamp')
  timestamp: Date;
}
