import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET') as string,
    });
  }

  async validate(payload: any) {
    // Todo: JWT Strategy의 validate 메서드 구현
    // - 이 메서드는 JWT 검증이 완료된 후 호출됩니다.
    // - payload는 JWT에 담긴 사용자 정보입니다.
    // - 이 메서드에서 사용자 정보를 가공하여 req.user로 전달할 객체를 반환합니다.
    // 예: payload로부터 userId, email을 추출하여 객체 형태로 반환하세요.
  }
}
