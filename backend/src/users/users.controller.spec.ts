import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { Gender } from './genders.enum';

export const mockUser = () => {
  const u = new User();
  u.id = 'q1312312';
  u.gender = 'male';
  u.firstName = 'John';
  u.lastName = 'Doe';
  u.bio = 'I like trains';
  u.email = 'hello@example.com';

  return u;
};

const mockUserService = {
  userDetail: jest.fn().mockImplementation(() => {
    return mockUser();
  }),
  searchUser: jest.fn().mockImplementation((gender: string) => {
    return gender === Gender.male ? [mockUser()] : [];
  }),
};

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return expected user as result', async () => {
    const u = mockUser();
    const got = await controller.details(u.id);

    expect(got.firstName).toEqual(u.firstName);
    expect(got.lastName).toEqual(u.lastName);
  });

  it('should search with gender', async () => {
    const maleResult = await controller.search(Gender.male);
    const femaleResult = await controller.search(Gender.female);

    expect(mockUserService.searchUser).toHaveBeenCalledTimes(2);
    expect(maleResult).toHaveLength(1);
    expect(femaleResult).toHaveLength(0);
  });
});
