import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../service/auth.service';
import users from '../../user/repository/users.mock.json';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('login 메서드를 호출할 수 있어야 합니다.', async () => {
    const mockBody = { userId: 'test', password: 'pass' };
    const mockUser = users[0];
    const mockToken = { access_token: 'mock.jwt.token' };

    jest.spyOn(service, 'validateUser').mockResolvedValue(mockUser);
    jest.spyOn(service, 'login').mockResolvedValue(mockToken);

    const result = await controller.login(mockBody);
    expect(service.validateUser).toHaveBeenCalledWith('test', 'pass');
    expect(service.login).toHaveBeenCalledWith(mockUser);
    expect(result).toEqual(mockToken);
  });

  it('getProfile 메서드는 토큰이 유효한 경우 유저 정보를 반환해야 합니다.', () => {
    const mockRequest: any = {
      user: {
        userId: 'alice01',
        email: 'alice@example.com',
      },
    };

    const result = controller.getProfile(mockRequest);
    expect(result).toEqual({
      message: '토큰이 유효합니다.',
      user: {
        userId: 'alice01',
        email: 'alice@example.com',
      },
    });
  });
});
