import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockUser } from './users.controller.spec';
import { Gender } from './genders.enum';

const mockUserRepository = {
  findOne: jest.fn().mockImplementation(() => {
    return mockUser;
  }),
  find: jest.fn().mockImplementation(() => {
    return [mockUser];
  }),
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find user by id', async () => {
    const u = mockUser();
    const got = await service.userDetail(u.id);

    expect(mockUserRepository.findOne).toHaveBeenCalled();
    expect(got).toEqual(mockUser);
  });

  it('should search with gender', async () => {
    const result = await service.searchUser(Gender.female);

    expect(mockUserRepository.find).toHaveBeenCalled();
    expect(result).toHaveLength(1);
  });

  it('should search by email', async () => {
    jest
      .spyOn(mockUserRepository, 'findOne')
      .mockImplementation(({ where: { email } }) => {
        const u = new User();
        u.email = email;
        return u;
      });

    const result = await service.findOneByEmail('yigit@example.com');

    expect(mockUserRepository.findOne).toHaveBeenCalled();
    expect(result.email).toEqual('yigit@example.com');
  });
});
