import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { STRIPE_MICROSERVICE_CREATE_CONNECT_ACCOUNT_MESSAGE, STRIPE_MICROSERVICE_CREATE_CUSTOMER_MESSAGE, STRIPE_MICROSERVICE_GET_CUSTOMER_CARD_MESSAGE } from './constants';
import { getCustomerCardRequestDto } from './dtos/get-customer-card-request.dto';
import { createCustomerCardRequestDto } from './dtos/create-customer-card-request.dto';
import { createConnectedAccountRequestDto } from './dtos/create-connected-account-request.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @MessagePattern(STRIPE_MICROSERVICE_CREATE_CUSTOMER_MESSAGE)
  async createCustomerCard(data: createCustomerCardRequestDto) {
    const result = await this.appService.createCustomerAndCard(data.cardToken, data.user)

    return result
  }

  @MessagePattern(STRIPE_MICROSERVICE_GET_CUSTOMER_CARD_MESSAGE)
  async getCustomerCard(data: getCustomerCardRequestDto) {

    const user = data.user
    const paymentMethod = await this.appService.getPaymentMethod(user)

    if (paymentMethod) {
      const firstPaymentMethod: any = paymentMethod.data.at(0)

      return {
        success: true,
        data: {
          last4: firstPaymentMethod.last4,
          brand: firstPaymentMethod.brand,
          country: firstPaymentMethod.country,
          expMonth: firstPaymentMethod.exp_month,
          expYear: firstPaymentMethod.exp_year,
        }
      }
    } else {
      return {
        success: false
      }
    }
  }

  @MessagePattern(STRIPE_MICROSERVICE_CREATE_CONNECT_ACCOUNT_MESSAGE)
  async createConnectedAccount(data: createConnectedAccountRequestDto) {
    
  }
}
