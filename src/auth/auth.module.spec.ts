import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from './auth.module';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { JwtStrategy } from './jwt/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../user/user.module';

describe('AuthModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [],
        }),
        AuthModule,
        UserModule,
      ],
    }).compile();
  });

  it('AuthController가 정의되어 있어야 합니다.', () => {
    const controller = module.get<AuthController>(AuthController);
    expect(controller).toBeDefined();
  });

  it('AuthService가 정의되어 있어야 합니다.', () => {
    const service = module.get<AuthService>(AuthService);
    expect(service).toBeDefined();
  });

  it('JwtStrategy가 정의되어 있어야 합니다.', () => {
    const strategy = module.get<JwtStrategy>(JwtStrategy);
    expect(strategy).toBeDefined();
  });
});
