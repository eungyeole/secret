import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}
    @Get('getinfo')
    getInfo(@Query('name') _query : string): object {
        return this.userService.getInfo(_query);
    }
}