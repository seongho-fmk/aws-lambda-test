import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'ad_contract' })
export class AdContractEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ name: 'sfdc_contract_id', type: 'varchar', length: 18 })
  sfdcContractId: string;

  @Column({ name: 'contract_name', type: 'varchar', length: 255 })
  contractName: string;

  @Column({ name: 'contract_number', type: 'int' })
  contractNumber: number;

  @Column({ name: 'contract_status', type: 'char', length: 1 })
  contractStatus: string;

  @Column({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column({ name: 'deleted_at', type: 'timestamp' })
  deletedAt: Date;
}
