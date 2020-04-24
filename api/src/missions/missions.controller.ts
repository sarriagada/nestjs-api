import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { Crud, CrudController, ParsedRequest, CrudRequest, CrudRequestInterceptor } from '@nestjsx/crud';
import { MissionsService } from './missions.service';
import { Mission } from 'src/models/mission.model';

@Crud({
  model: {
    type: Mission
  }
})
@Controller('missions')
export class MissionsController implements CrudController<Mission> {
  constructor(public service: MissionsService) {}

  @UseInterceptors(CrudRequestInterceptor)
  @Get(':id/motivation')
  async getMissionMotivation(@ParsedRequest() req: CrudRequest) {
    let mission = await this.service.getOne(req);
    console.log(">> mission", mission);
    return {
      message: `${mission.title} it’s just a game for a real ninja.`
    };
  }
}
