import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private model: Model<User>) {}

  async create(createUserDto: User): Promise<User> {
    const createdUser = new this.model(createUserDto);
    return createdUser.save();
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.model.findOne({ email }).exec();
  }
}
