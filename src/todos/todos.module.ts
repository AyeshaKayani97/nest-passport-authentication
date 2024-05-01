import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './schemas/Todo.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports:[
        AuthModule,
        MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
    ],
    

  providers: [TodosService],
    

  controllers: [TodosController]
})
export class TodosModule {}
