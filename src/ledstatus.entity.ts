import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: "ledstatus"})
export class LedStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column('timestamp')
  timestamp: Date;
}
