import { Prop, Schema as mongoSchema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema, Types } from 'mongoose';
import { Subscription } from '../../subscriptions/schemas/subscription.schema';
import { User } from '../../users/schemas/user.schema';

@mongoSchema({ timestamps: true })
export class UserSubscription extends Document {
  @Prop({ required: true, type: Types.ObjectId, ref: Subscription.name })
  subscriptionId: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: User.name })
  userId: Types.ObjectId;

  @Prop({ default: false })
  isActive: boolean;

  @Prop({ default: Date.now() })
  startDate: Date;

  @Prop()
  endDate: Date;
}

export const UserSubscriptionSchema: Schema<UserSubscription> = SchemaFactory.createForClass(UserSubscription);
