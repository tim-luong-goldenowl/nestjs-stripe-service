import { IsEmail, IsNotEmpty, IsNumber, IsString, isNumber } from 'class-validator';
import User from 'src/entities/user.entity';

export class getCustomerCardRequestDto {
    user: User
}