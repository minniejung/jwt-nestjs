import users from './users.mock.json';

export class UserRepository {
  async findOne(userId: string) {
    return users.find((u) => u.userId === userId);
  }

  async findAll() {
    return users;
  }
}
