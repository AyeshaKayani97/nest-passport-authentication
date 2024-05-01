import { Controller, Post, Body, Delete, Param, Patch, Get, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { CreateTodoDto } from './dto/create.dto';
import { TodosService } from './todos.service';
import mongoose from 'mongoose';
import { updateTodoDto } from './dto/updateTodo.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('todos')
export class TodosController {
    constructor(
       private  todoService:TodosService
    ){}

    @Get()
    getAllToDos(){
        return this.todoService.findAll();

    }

 
    @Post()
    @UseGuards(AuthGuard())
    createTodo(
        // @Param("userId") userId:string,
        @Body() createTodoDto:CreateTodoDto){
        return this.todoService.createTodo(createTodoDto);

    }
    @Patch(":id")
    updateTodo(@Param("id") id:string, @Body() updateTodoDto:updateTodoDto){
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) {
          throw new HttpException("Invalid ID", HttpStatus.NOT_FOUND);
        }
        const updateTodo = this.todoService.updateToDo(id, updateTodoDto);
        if(!updateTodo){
            throw new HttpException("No user found", HttpStatus.NOT_FOUND);

        }
        return updateTodo

    }

    @Delete(":id")
    deleteTodod(@Param() id:string){
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) {
          throw new HttpException("Invalid ID", HttpStatus.NOT_FOUND);
        }
        const deleteUser =  this.todoService.deleteTodo(id);
        if(!deleteUser){
            throw new HttpException("No todo found with this id",  HttpStatus.NOT_FOUND);

        }
        return deleteUser;

    }


}
