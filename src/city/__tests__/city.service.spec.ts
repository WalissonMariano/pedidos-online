import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CityService } from '../city.service';
import { City } from '../entities/city.entity';
import { CacheService } from '../../cache/cache.service';
import { cityMock } from '../__mocks__/city.mock';

describe('CityService', () => {
  let service: CityService;
  let cityRepository: Repository<City>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CityService,
        {
          provide: CacheService,
          useValue: {
            getCache: jest.fn().mockResolvedValue({}),
          },
        },
        {
          provide: getRepositoryToken(City),
          useValue: {
            find: jest.fn().mockResolvedValue(cityMock),
          },
        }
      ],
    }).compile();

    service = module.get<CityService>(CityService);
    cityRepository = module.get<Repository<City>>(
      getRepositoryToken(City),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cityRepository).toBeDefined();
  });

  it('should return findOne City', async () => {
    const city = await service.getCityById(cityMock.id);

    expect(city).toEqual(cityMock);
  });

});
