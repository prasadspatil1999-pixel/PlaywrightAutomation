import{test as baseTest} from '@playwright/test'
import { LoginPage } from '../LoginPage'
import { ProductPage } from '../pages/Products Page'
import { MyCartPage } from '../pages/MyCartPage'
import { PaymentMethodPage } from '../pages/Payment Method'
import { orderpage } from '../pages/OrderPage'

type pomFixture={
    login:LoginPage
    product:ProductPage
    mycart:MyCartPage
    payment:PaymentMethodPage
    order:orderpage

}
export const test=baseTest.extend<pomFixture>({
    login:async ({page},use)=>
    {
        await use(new LoginPage(page))
    },
    product:async ({page},use) => {
        await use(new ProductPage(page))
        
    },
    mycart:async({page},use)=>
    {
        await use(new MyCartPage(page))
    },
    payment:async({page},use)=>
    {
        await use(new PaymentMethodPage(page))
    },
    order:async ({page},use) => {
        await use(new orderpage(page))
    }


})