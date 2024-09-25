import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './entities/city.entity';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class CityService {

    constructor(
        @InjectRepository(City)
        private readonly cityRepository: Repository<City>,
        
        private readonly cacheService: CacheService,
    ) {};

    async getAllCitiesByStateId(stateId: number): Promise<City[]> {
        return this.cacheService.getCache<City[]>(`${stateId}`,
            () => this.cityRepository.find({
                where: {
                    stateId, 
                },
            })
        )

    }

    async getCityById(cityId: number): Promise<City> {
        const city = await this.cityRepository.findOne({
            where: {
                id: cityId,
            },
        });

        if(!city) {
            throw new NotFoundException(`CityId: ${cityId} not found.`);
        }

        return city;

    }

}
