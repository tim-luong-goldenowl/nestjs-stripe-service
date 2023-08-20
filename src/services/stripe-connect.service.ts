import { BadGatewayException, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { InjectStripe } from 'nestjs-stripe';

@Injectable()
export class AppService {
  constructor(
    @InjectStripe() private readonly stripeClient: Stripe
  ) { }

  async createAccountOnboardingLink(accountId: string, returnUrl: string): Promise<string> {
    const accountLink = await this.stripeClient.accountLinks.create({
      account: accountId,
      refresh_url: 'https://example.com/reauth',
      return_url: returnUrl,
      type: 'account_onboarding',
    });

    return accountLink.url;
  }
}
