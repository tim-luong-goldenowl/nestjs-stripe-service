import User from 'src/entities/user.entity';

export class createCustomerCardRequestDto {
    user: User
    cardToken: string
}