import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

import { HydratedDocument } from 'mongoose';


export type CatDocument = HydratedDocument<User>;

@Schema({ timestamps: true })

export class Todo {
  @Prop()
  title: string;

  // @Prop({type:mongoose.Schema.Types.ObjectId, ref:'User'})
  // user: User;


}


export const TodoSchema = SchemaFactory.createForClass(Todo);
