import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { UserSubscriptionsService } from './user-subscriptions.service';
import { CreateUserSubscriptionDto } from './dto/create-user-subscription.dto';
import { AuthGuard } from '../../guards/auth.guard';

@Controller('user-subscriptions')
@UseGuards(AuthGuard)
export class UserSubscriptionsController {
  constructor(private readonly userSubscriptionsService: UserSubscriptionsService) {
  }

  @Post()
  create(@Body() body: CreateUserSubscriptionDto) {
    return this.userSubscriptionsService.create(body);
  }

  // TODO => Write a method that retrieves all user subscriptions from the collection
  @Get()
  findAll() {
    return this.userSubscriptionsService.findAll();
  }

  // TODO => Write a method that retrieve a user subscription by id.
  @Get(':id')
  findOne() {
    return this.userSubscriptionsService.findOne();
  }

  // TODO => Write a method that update a user subscription fields by id.
  @Patch(':id')
  update() {
    return this.userSubscriptionsService.update();
  }

  // TODO => Write a method that delete a user subscription by id.
  @Delete(':id')
  remove() {
    return this.userSubscriptionsService.remove();
  }
}
