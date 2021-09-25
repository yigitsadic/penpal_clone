import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('user detail should be defined', () => {
    const result = service.userDetail('123123');

    expect(result.firstName).toEqual('Lorem');
    expect(result.lastName).toEqual('Ipsum');
  });

  it('should return blank if no user found', () => {
    const got = service.userDetail('qrfdle');

    expect(got).toBeUndefined();
  });
});
