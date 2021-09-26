import { Test, TestingModule } from '@nestjs/testing';
import { PasswordService } from './password.service';

describe('PasswordService', () => {
  let service: PasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordService],
    }).compile();

    service = module.get<PasswordService>(PasswordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('it can hash given password', async () => {
    // This just tests that we process given string and
    // return something different than given value.
    const given = 'lorem ipsum hello';
    const got = await service.hashPassword(given);

    expect(got).toEqual(expect.any(String));
    expect(got).not.toEqual(given);
  });

  it('should return true when password matches', async () => {
    const given = 'lorem ipsum';
    const hashed = await service.hashPassword(given);

    const got = await service.comparePasswords(given, hashed);

    expect(got).toBeTruthy();
  });
});
