import { IsBoolean, IsDate, IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateUserSubscriptionDto {
  @IsNotEmpty()
  @IsMongoId()
  subscriptionId: string;

  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;

  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @IsNotEmpty()
  @IsDate()
  endDate: Date;
}