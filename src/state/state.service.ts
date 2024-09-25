import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { State } from './entities/state.entity';

@Injectable()
export class StateService {

    constructor(
        @InjectRepository(State)
        private readonly stateRepository: Repository<State>
    ) {};

    async getAllState(): Promise<State[]> {
        return this.stateRepository.find();
    }
}
