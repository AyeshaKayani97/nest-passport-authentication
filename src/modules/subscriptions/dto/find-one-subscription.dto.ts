import { IsMongoId, IsNotEmpty } from 'class-validator';

export class FindOneSubscriptionParamsDto {
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}