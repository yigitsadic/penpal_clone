import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PasswordService } from '../password/password.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';

const mockUserService = {
  findOneByEmail: jest.fn().mockImplementation(() => {
    return 'I am placeholder';
  }),
};

const mockJwtService = {
  sign: jest.fn().mockImplementation(() => 'ey...'),
};

describe('AuthService', () => {
  let service: AuthService;
  let passwordService: PasswordService;
  const testData = {
    password: 'Hello',
    email: 'hello@example.com',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        PasswordService,
        {
          provide: UsersService,
          useValue: mockUserService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    passwordService = module.get<PasswordService>(PasswordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return user if everything goes OK', async () => {
    const hashedPw = await passwordService.hashPassword(testData.password);
    const expectedId = 'some-uuid';

    jest.spyOn(mockUserService, 'findOneByEmail').mockImplementation(() => {
      return new User({
        id: expectedId,
        password: hashedPw,
        email: testData.email,
      });
    });

    const got = await service.validateUser(testData.email, testData.password);

    expect(got.id).toEqual(expectedId);
  });

  it('should return null if password not matches', async () => {
    jest.spyOn(mockUserService, 'findOneByEmail').mockImplementation(() => {
      return new User({
        email: testData.email,
        password: testData.password,
      });
    });

    const got = await service.validateUser(testData.email, testData.password);

    expect(got).toBeNull();
  });

  it('should return null if anything goes wrong', async () => {
    jest.spyOn(mockUserService, 'findOneByEmail').mockImplementation(() => {
      return null;
    });

    const got = await service.validateUser(testData.email, testData.password);

    expect(got).toBeNull();
  });
});
