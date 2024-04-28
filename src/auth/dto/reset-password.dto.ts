import { IsNotEmpty, MinLength} from "class-validator";
export class ResetPasswordDTO {
    @IsNotEmpty({ message: 'Password is required.' })
    @MinLength(8, { message: 'Password must be at least 8 characters.' })
    password: string;

    @IsNotEmpty({ message: 'Activation Token is required.' })
    token: string;
}