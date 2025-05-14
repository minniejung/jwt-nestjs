import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 9090);
}

bootstrap().catch((err) => {
  console.error("앱 실행 중 오류 발생:", err);
});
