import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Subscription } from './schemas/subscription.schema';
import { Model } from 'mongoose';
import { FindOneSubscriptionParamsDto } from './dto/find-one-subscription.dto';

@Injectable()
export class SubscriptionsService {
  constructor(@InjectModel(Subscription.name) private readonly subscriptionModel: Model<Subscription>) {
  }

  async create(body: CreateSubscriptionDto): Promise<void> {
    await this.subscriptionModel.create(body);
  }

  findAll(): Promise<Subscription[]> {
    return this.subscriptionModel.find();
  }

  async findOne(params: FindOneSubscriptionParamsDto): Promise<Subscription> {
    return this.subscriptionModel.findById(params.id);
  }

  update() {
    return `This action updates a subscription`;
  }

  remove() {
    return `This action removes a subscription`;
  }
}
