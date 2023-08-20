import { BadGatewayException, Injectable } from '@nestjs/common';
import User from './entities/user.entity';
import Stripe from 'stripe';
import { InjectStripe } from 'nestjs-stripe';

@Injectable()
export class AppService {
  constructor(
    @InjectStripe() private readonly stripeClient: Stripe
  ) { }

  async getPaymentMethod(user: User): Promise<Stripe.ApiListPromise<Stripe.CustomerSource>> {
    try {
      const res = await this.stripeClient.customers.listSources(user.stripeCustomerId, {
        object: 'card',
        limit: 1
      })

      return res
    } catch (error) {
      throw new BadGatewayException
    }
  }

  async createCustomerAndCard(cardToken: string, user: User): Promise<any> {
    let stripeCustomerId = user.stripeCustomerId

    if (!stripeCustomerId) {
      stripeCustomerId = await this.createCustomer(user)
    }

    const customerCard = await this.stripeClient.customers.createSource(stripeCustomerId, {
      source: cardToken
    })

    return {
      stripeCustomerId,
      customerCard
    }
  }


  private async createCustomer(user: User): Promise<string> {
    const res = await this.stripeClient.customers.create({
      email: user.email
    })

    return res.id
  }
}
