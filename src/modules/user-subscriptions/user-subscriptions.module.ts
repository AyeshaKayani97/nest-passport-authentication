import { Module } from '@nestjs/common';
import { UserSubscriptionsService } from './user-subscriptions.service';
import { UserSubscriptionsController } from './user-subscriptions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSubscription, UserSubscriptionSchema } from './schemas/user-subscription.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: UserSubscription.name,
      schema: UserSubscriptionSchema,
    },
    { name: User.name, schema: UserSchema }],
  )],
  controllers: [UserSubscriptionsController],
  providers: [UserSubscriptionsService, JwtService],
})
export class UserSubscriptionsModule {
}
