import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/user.service';
import { UnauthorizedException } from '@nestjs/common';

const mockUser = {
  id: 1,
  userId: 'testuser',
  password: 'securepass',
  email: 'test@example.com',
  createdAt: '',
  updatedAt: '',
};

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: { sign: jest.fn(() => 'signed.jwt.token') },
        },
        {
          provide: UserService,
          useValue: {
            findByUserId: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('validateUser', () => {
    it('정상적인 유저 정보로 인증에 성공해야 합니다.', async () => {
      jest.spyOn(userService, 'findByUserId').mockResolvedValue(mockUser);
      const result = await service.validateUser('testuser', 'securepass');
      expect(result).toEqual(mockUser);
    });

    it('유저가 존재하지 않으면 예외를 던져야 합니다.', async () => {
      jest.spyOn(userService, 'findByUserId').mockResolvedValue(undefined);
      await expect(service.validateUser('wronguser', 'pass')).rejects.toThrow(
        UnauthorizedException
      );
    });

    it('비밀번호가 다르면 예외를 던져야 합니다.', async () => {
      jest.spyOn(userService, 'findByUserId').mockResolvedValue({
        ...mockUser,
        password: 'differentpass',
      });
      await expect(
        service.validateUser('testuser', 'wrongpass')
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('login', () => {
    it('토큰을 생성하여 반환해야 합니다.', async () => {
      const result = await service.login(mockUser);
      expect(jwtService.sign).toHaveBeenCalledWith({
        userId: mockUser.userId,
        email: mockUser.email,
      });
      expect(result).toEqual({ access_token: 'signed.jwt.token' });
    });
  });
});
