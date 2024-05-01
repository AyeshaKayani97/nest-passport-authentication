import { Controller, Body, Post, Get, Param, Query} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LogInDTO } from './dto/signin.dto';
import { ForgotPasswordDTO } from './dto/forgot-password.dto';
import { ResetPasswordDTO } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService:AuthService
    ){}

    @Post("/register")


    signUp( @Body() signUpDto:SignUpDto):Promise<{token:string}>{
        return this.authService.signUp(signUpDto);

    }
    @Post("/login")
    logIn( @Body() loginDto:LogInDTO):Promise<{token:string}>{
        return this.authService.login(loginDto);



    }
    @Post("/forgot-password")
    forgotPassword( @Body() forgotPasswordDTO:ForgotPasswordDTO):Promise<{message:string}>{
        return this.authService.forgotPassword(forgotPasswordDTO);


    }

    @Get('/reset-password')
    async showResetPasswordForm(
        @Query('token') token: string
    ) {
      // Render the reset password form or handle it as needed
      return `Reset password form for token: ${token}`;
    }

  
    @Post("/rest-password")
    resetPassword(@Body() resetPasswordDTO: ResetPasswordDTO){
        return this.authService.resetPassword(resetPasswordDTO);
    }


}

