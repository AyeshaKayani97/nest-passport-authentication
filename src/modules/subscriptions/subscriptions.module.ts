import { Module } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Subscription, SubscriptionSchema } from './schemas/subscription.schema';
import { JwtService } from '@nestjs/jwt';
import { User, UserSchema } from '../users/schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Subscription.name, schema: SubscriptionSchema }, {
    name: User.name,
    schema: UserSchema,
  }])],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService, JwtService],
})
export class SubscriptionsModule {
}
