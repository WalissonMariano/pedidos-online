import { Controller, Get } from '@nestjs/common';
import { StateService } from './state.service';
import { State } from './entities/state.entity';

@Controller('state')
export class StateController {

    constructor(
        private readonly stateService: StateService,
    ) {};

    @Get()
    async getAllState(): Promise<State[]> {
        return this.stateService.getAllState();
    }
}
