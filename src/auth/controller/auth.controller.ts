import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
} from "@nestjs/common";
import { AuthService } from "../service/auth.service";
import { JwtAuthGuard } from "../jwt/jwt-auth.guard";
import { Request as ExpressRequest } from "express";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  async login(@Body() body: { userId: string; password: string }) {
    // TODO: 로그인 요청 처리
    // 1. AuthService의 validateUser()를 호출해 사용자 정보를 검증합니다.
    // 2. 검증에 성공하면, AuthService의 login()을 통해 JWT를 생성하고 반환합니다.
    const user = await this.authService.validateUser(
      body.userId,
      body.password
    );
    console.log("user >>> ", user);
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  getProfile(@Request() req: ExpressRequest) {
    // TODO: 사용자 정보 조회
    // 1. 인증된 사용자 정보는 req.user에 저장되어 있습니다.
    // 2. 사용자 정보를 클라이언트에 응답으로 반환합니다.
    return { message: "토큰이 유효합니다.", user: req.user };
  }
}
