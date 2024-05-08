import { Prop, Schema as mongoSchema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema } from 'mongoose';

@mongoSchema({ timestamps: true })
export class Subscription extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: string;

  @Prop({ required: true })
  duration: string;

  @Prop({ default: [] })
  features: string[];
}

export const SubscriptionSchema: Schema<Subscription> = SchemaFactory.createForClass(Subscription);
