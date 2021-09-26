import { Test, TestingModule } from '@nestjs/testing';
import { RegistrationsService } from './registrations.service';
import { PasswordService } from '../password/password.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { RegistrationDto } from './registration.dto';
import { Gender } from '../users/genders.enum';

const dto = new RegistrationDto();
dto.password = '132312312';
dto.email = 'hello@example.com';
dto.cityId = '43c5164b-30f7-428e-a5a1-59d8f2f38d31';
dto.firstName = 'John';
dto.lastName = 'Doe';
dto.gender = Gender.female;

const mockRegisterRepository = {
  create: jest.fn().mockImplementation(() => {
    return new User();
  }),
  save: jest.fn().mockImplementation(async () => new User()),
};

describe('RegistrationsService', () => {
  let service: RegistrationsService;
  let passwordService: PasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegistrationsService,
        PasswordService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRegisterRepository,
        },
      ],
    }).compile();

    service = module.get<RegistrationsService>(RegistrationsService);
    passwordService = module.get<PasswordService>(PasswordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should insert user', async () => {
    jest
      .spyOn(passwordService, 'hashPassword')
      .mockImplementation(async () => 'lorem');

    await service.register(dto);

    expect(passwordService.hashPassword).toHaveBeenCalled();
    expect(mockRegisterRepository.create).toHaveBeenCalled();
    expect(mockRegisterRepository.save).toHaveBeenCalled();
  });
});
