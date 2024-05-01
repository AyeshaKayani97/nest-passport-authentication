import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Types } from 'mongoose';
import { HydratedDocument } from 'mongoose';


export type CatDocument = HydratedDocument<User>;


@Schema({ timestamps: true })

export class User {
  @Prop()
  name: string;

  @Prop({ unique: [true, "Duplicated email entered"] })
  email: string;

  @Prop()
  password: string;

  @Prop()
  token: string;
}


export const UserSchema = SchemaFactory.createForClass(User);
