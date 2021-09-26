import { Test, TestingModule } from '@nestjs/testing';
import { RegistrationsController } from './registrations.controller';
import { RegistrationsService } from './registrations.service';
import { RegistrationDto } from './registration.dto';
import { Gender } from '../users/genders.enum';
import { HttpStatus, UnprocessableEntityException } from '@nestjs/common';

const mockRegistrationService = {
  register: jest.fn().mockImplementation(() => {}),
};

describe('RegistrationsController', () => {
  let controller: RegistrationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegistrationsController],
      providers: [
        {
          provide: RegistrationsService,
          useValue: mockRegistrationService,
        },
      ],
    }).compile();

    controller = module.get<RegistrationsController>(RegistrationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should respond with success message', async () => {
    const res = await controller.register(new RegistrationDto());

    expect(res.status).toEqual('success');
  });

  it('should respond with failure message when error occurred', async () => {
    const message = 'unable to insert record to database';

    jest.spyOn(mockRegistrationService, 'register').mockImplementation(() => {
      throw new Error(message);
    });

    try {
      await controller.register(new RegistrationDto());
    } catch (e) {
      expect((e as UnprocessableEntityException).getStatus()).toEqual(
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
      expect((e as UnprocessableEntityException).message).toEqual(message);
    }
  });
});
