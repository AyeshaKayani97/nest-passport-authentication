import { IsNotEmpty, IsString } from "class-validator";

export class updateTodoDto{

    @IsString()
    @IsNotEmpty()
    title:string
} 