import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {  Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { SignUpDto } from './dto/signup.dto';
import { LogInDTO } from './dto/signin.dto';
import * as bcrypt from "bcryptjs";
import { JwtService } from '@nestjs/jwt';
import { ForgotPasswordDTO } from './dto/forgot-password.dto';
import randomstring from "randomstring";
import  nodemailer from "nodemailer";
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';


@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
         private userModel : Model<User>,
         private jwtService:JwtService,
         private configService:ConfigService,
         private readonly mailService: MailerService
    ){}

    async signUp(signUpDto:SignUpDto):Promise<{token:string}>{
        const {name, email, password} = signUpDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userModel.create({
            name,
            password: hashedPassword,
            email


        })
        const token = this.jwtService.sign({id:user._id})
        return {token}



    }


    async login(loginDto:LogInDTO):Promise<{token:string}>{
        const {email, password} = loginDto
        const user = await this.userModel.findOne({email})
        if(!user){
            throw new  UnauthorizedException("Invalid email or password")

        }
        const isPasswordMatched = await bcrypt.compare(password, user.password)

        if(!isPasswordMatched){
            throw new  UnauthorizedException("Invalid email or password")

        }

        const token = this.jwtService.sign({id:user._id})
            return { token}
        

    }

    async resetPasswordEmail(name, email, token){
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.email",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
              user:this.configService.get<string>("SMTP_USERNAME"),
              pass: this.configService.get<string>("SMTP_PASSWORD"),
            },

        });
        const mailOptions = {
            from:this.configService.get<string>("SMTP_USERNAME"),
            to: email, // list of receivers
            subject: "For reset password ✔", 
            // text: "Hello world?", 
            html: 'Hi ' +name+ ', please copy the link <a href="http://127.0.0.1:3000/auth/reset-password?token= '+token+'" >reset password</a> ', 
        }
        this.mailService.sendMail(mailOptions);


    }
    async forgotPassword( forgotPasswordDTO:ForgotPasswordDTO ):Promise<{message:string}>{
        const { email } = forgotPasswordDTO;
        const emailExist = await this.userModel.findOne({email})
        if(emailExist){
            const randomString = randomstring.generate() 
            await this.userModel.updateOne({ email: email }, { $set: { token: randomString } });
            await this.resetPasswordEmail(user.name, user.email, randomString);
            return {
                "message":"Reset password email has been sent. Please check your inbox."
            }

        }
        throw new  UnauthorizedException("This Email Does Not Exist")
    }
}
