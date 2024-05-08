import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserSubscriptionDto } from './dto/create-user-subscription.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserSubscription } from './schemas/user-subscription.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserSubscriptionsService {
  constructor(@InjectModel(UserSubscription.name) private readonly userSubscriptionModel: Model<UserSubscription>) {
  }

  async create(body: CreateUserSubscriptionDto): Promise<void> {
    const isActive: UserSubscription = await this.userSubscriptionModel.findOne({
      userId: body.userId,
      isActive: true,
    });

    if (isActive) {
      throw new BadRequestException('You are already subscribed to a subscription.');
    }

    await this.userSubscriptionModel.create(body);
  }

  findAll() {
    return `This action returns all userSubscriptions`;
  }

  findOne() {
    return `This action returns a  userSubscription`;
  }

  update() {
    return `This action updates a userSubscription`;
  }

  remove() {
    return `This action removes a userSubscription`;
  }
}
