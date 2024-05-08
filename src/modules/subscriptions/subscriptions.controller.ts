import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { Subscription } from './schemas/subscription.schema';
import { FindOneSubscriptionParamsDto } from './dto/find-one-subscription.dto';
import { AuthGuard } from '../../guards/auth.guard';

@Controller('subscriptions')
@UseGuards(AuthGuard)
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {
  }

  @Post()
  create(@Body() body: CreateSubscriptionDto): Promise<void> {
    return this.subscriptionsService.create(body);
  }

  @Get()
  findAll(): Promise<Subscription[]> {
    return this.subscriptionsService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindOneSubscriptionParamsDto): Promise<Subscription> {
    return this.subscriptionsService.findOne(params);
  }


  // TODO => Write a update method that receives subscription id and fields to update them.
  @Patch(':id')
  update() {
    return this.subscriptionsService.update();
  }

  // TODO => Write a delete method that receives subscription id and delete it.
  @Delete(':id')
  remove() {
    return this.subscriptionsService.remove();
  }
}
