import User from 'src/entities/user.entity';

export class createConnectedAccountRequestDto {
    user: User
    cardToken: string
}