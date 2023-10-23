import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'sensordata' })
export class SensorData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 5, scale: 2 })
  temperature: number;

  @Column('decimal', { precision: 5, scale: 2 })
  humidity: number;

  @Column('decimal', { precision: 5, scale: 2 })
  light: number;

  @Column('timestamp')
  timestamp: Date = new Date(Date.now())

  // Các trường khác nếu cần
}
