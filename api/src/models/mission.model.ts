import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsInt, IsBoolean, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Mission {
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty({
    description: 'The mission name',
    maxLength: 50
  })
  @IsNotEmpty()
  @Column({ length: 50 })
  title: string;

  @ApiProperty({
    description: 'The coins reward for complete the mission',
    default: 1,
  })
  @IsInt()
  @Min(0)
  @Column()
  reward: number = 1;

  @ApiProperty({
    default: false,
  })
  @IsBoolean()
  @Column()
  active: boolean = false;

  @Exclude() @Column() createdAt: Date = new Date();
  @Exclude() @Column() isDeleted: boolean = false;
}
