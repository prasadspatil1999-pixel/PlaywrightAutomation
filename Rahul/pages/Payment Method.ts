import { Page, Locator } from '@playwright/test'
import { BasePage } from './BasePage';

export class PaymentMethodPage extends BasePage {
    private creditCardNumber: Locator
    private cvvCode: Locator
    private nameOnCard: Locator
    private verifyEmail: Locator
    private enterCityName: Locator
    private selectCountry: Locator
    private placeOrderBtn: Locator

    constructor(page: Page) {
        super(page)
        this.creditCardNumber = this.page.locator("input.input").nth(0)
        this.cvvCode = this.page.locator("input.input").nth(1)
        this.nameOnCard = this.page.locator("input.input").nth(2)
        this.verifyEmail = this.page.locator("div.details__user input").first()
        this.enterCityName = this.page.locator("div.details__user input").last()
        this.selectCountry = this.page.locator("section.ta-results button")
        this.placeOrderBtn = this.page.getByText("Place Order ")
    }
    async PersonalInformation(creditcardnumber: string, creditCardcvv: string, nameoncard: string) {
        await this.creditCardNumber.clear()
        await this.fill(this.creditCardNumber, creditcardnumber)
        await this.fill(this.cvvCode, creditCardcvv)
        await this.fill(this.nameOnCard, nameoncard)
    }
    async ShippingInformation(country: string, usercountry: string) {
        await this.enterCityName.pressSequentially(country)
        await this.selectCountry.last().waitFor()
        const allcity = await this.selectCountry.count()
        for (let i = 0; i < allcity; i++) {
            const citys = await this.selectCountry.nth(i).innerText()
            if (citys.trim() === usercountry) {
                await this.selectCountry.nth(i).click()
                break
            }
        }

        const email = await this.verifyEmail.inputValue()
        console.log("Verify Email = ", email)
        await this.placeOrderBtn.click()
        return email
    }
}
