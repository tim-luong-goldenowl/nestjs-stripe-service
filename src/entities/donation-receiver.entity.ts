import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './user.entity';
import StripeConnectCustomer from './stripe-connect-customer.entity';
import Donation from './donation.entity';
 
@Entity()
class DonationReceiver {
  @Index()
  @PrimaryGeneratedColumn()
  public id: number;
  
  @Column({nullable: true})
  public email: string

  @Column({nullable: true})
  public businessName: string

  @Column({nullable: true})
  public companyName: string
  
  @Column({nullable: true})
  public country: string

  @Column({type: 'text', nullable: true})
  public bio: string

  @Column({nullable: true})
  public onboardingCompleteToken: string

  @Column({nullable: true})
  public avatarUrl: string

  @Column({default: false})
  public verified: boolean

  @Column({nullable: true})
  public stripeConnectedAccountId: string

  @JoinColumn()
  @OneToOne(() => User)
  public user: User;
  
  @OneToMany(() => Donation, (donation) => donation.donationReceiver)
  donations: Donation[]

  @OneToMany(() => StripeConnectCustomer, (stripeConnectCustomer) => stripeConnectCustomer.donationReceiver)
  stripeConnectCustomers: Donation[]
}
 
export default DonationReceiver;