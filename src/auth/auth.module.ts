import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '15m' },
      }),
    }),
    UserModule,
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [
    // Todo: 인증 관련 provider를 등록하세요.
    // - AuthService: 로그인 및 사용자 검증 로직을 담당합니다.
    // - JwtStrategy: JWT 토큰 검증을 위한 전략을 구현합니다.
  ],
})
export class AuthModule {}
