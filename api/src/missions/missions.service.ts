import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Mission } from 'src/models/mission.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MissionsService extends TypeOrmCrudService<Mission> {
  constructor(@InjectRepository(Mission) missionsRepository: Repository<Mission>){
    super(missionsRepository);
  }
}
