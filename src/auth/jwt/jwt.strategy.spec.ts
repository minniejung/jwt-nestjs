import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

describe('JwtStrategy', () => {
  it('payload를 검증할 수 있어야 합니다.', async () => {
    const mockConfig = { get: jest.fn().mockReturnValue('secret') };
    const strategy = new JwtStrategy(mockConfig as unknown as ConfigService);
    const payload = { userId: 'user01', email: 'test@example.com' };
    expect(await strategy.validate(payload)).toEqual(payload);
  });
});
