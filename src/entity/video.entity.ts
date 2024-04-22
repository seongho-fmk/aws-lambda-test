import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AdContractEntity } from './ad-contract.entity';

@Entity({ name: 'video' })
export class VideoEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'video_name', type: 'varchar', length: 255 })
  videoName: string;

  @ManyToOne(() => AdContractEntity, (adContract) => adContract.id)
  contract: AdContractEntity;

  @Column({ name: 'preset', type: 'varchar' })
  preset: string;

  @Column({ name: 'device_size', length: 255, type: 'varchar' })
  deviceSize: string;

  @Column({ name: 'video_url', length: 255, type: 'varchar' })
  videoUrl: string;

  @Column({ name: 'thumbnail_url', length: 255, type: 'varchar' })
  thumbnailUrl: string;

  @Column({ name: 'file_size', type: 'bigint' })
  fileSize: number;

  @Column({ name: 'duration', type: 'int' })
  duration: number;

  @Column({ name: 'video_info', type: 'jsonb' })
  videoInfo: object;

  @Column({ name: 'analytics', type: 'jsonb' })
  analytics: object;

  @Column({ name: 'is_notice', type: 'boolean', default: false })
  isNotice: boolean;

  @Column({ name: 'cue_order', type: 'smallint' })
  cueOrder: number;

  @Column({ name: 'transcoding_status', length: 10, type: 'varchar' })
  transcodingStatus: string;

  @Column({ name: 'transcoding_updated_at', type: 'timestamp' })
  transcodingUpdatedAt: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column({ name: 'deleted_at', type: 'timestamp' })
  deletedAt: Date;

  @Column({ name: 'created_by', length: 40, type: 'varchar' })
  createdBy: string;

  @Column({ name: 'updated_by', length: 40, type: 'varchar' })
  updatedBy: string;

  @Column({ name: 'deleted_by', length: 40, type: 'varchar' })
  deletedBy: string;
}
