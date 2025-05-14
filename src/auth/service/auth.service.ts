import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../../user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UserService
  ) {}

  async validateUser(userId: string, password: string) {
    // Todo: 사용자를 검증하는 함수 작성
    // - UserService의 findByUserId 메서드를 이용해 userId로 사용자 조회하려 리턴
    // - 사용자가 없거나 비밀번호가 일치하지 않으면 UnauthorizedException 오류 발생
    const res = await this.usersService.findByUserId(userId);
    if (!res) {
      throw new UnauthorizedException();
    }
    if (res.password !== password) {
      throw new UnauthorizedException();
    }
    return res;
  }

  async login(user: any) {
    // Todo: 로그인 시 JWT 토큰 생성
    // - JWT payload에 userId, email을 포함하여 구성
    // - jwtService.sign() 메서드로 access_token 발급
    return {
      access_token: this.jwtService.sign({
        userId: user.userId,
        email: user.email,
      }),
    };
  }
}
