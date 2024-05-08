import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { TodosModule } from './modules/todos/todos.module';
import { EmailModule } from './modules/email/email.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';
import { UserSubscriptionsModule } from './modules/user-subscriptions/user-subscriptions.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    EmailModule,
    TodosModule,
    SubscriptionsModule,
    UserSubscriptionsModule,
  ],
})

export class AppModule {
}
