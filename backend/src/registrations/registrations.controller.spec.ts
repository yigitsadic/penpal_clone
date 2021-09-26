import { Test, TestingModule } from '@nestjs/testing';
import { RegistrationsController } from './registrations.controller';
import { RegistrationsService } from './registrations.service';
import { RegistrationDto } from './registration.dto';
import { HttpStatus, UnprocessableEntityException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { PasswordModule } from '../password/password.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';

const mockRegistrationService = {
  register: jest.fn().mockImplementation(() => {
    return null;
  }),
};

const mockAuthService = {};

describe('RegistrationsController', () => {
  let controller: RegistrationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegistrationsController],
      imports: [PasswordModule],
      providers: [
        {
          provide: RegistrationsService,
          useValue: mockRegistrationService,
        },
        {
          provide: AuthService,
          useValue: mockAuthService,
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

    expect(res.access_token).toEqual(expect.any(String));
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
