import { Page, Locator } from '@playwright/test'
import { BasePage } from './BasePage'

export class ProductPage extends BasePage {
    private productSelect: Locator
    private productAddSuccessMessage: Locator
    private cartBtn: Locator

    constructor(page: Page) {
        super(page)
        this.productSelect = this.page.locator("div.card-body")
        this.productAddSuccessMessage = this.page.getByText(" Product Added To Cart ").last()
        this.cartBtn = this.page.locator("button.btn-custom").nth(2)
    }
    async selectProduct(product: string) {
        await this.productSelect.first().waitFor()
        const allProducts = await this.productSelect.count()
        for (let i = 0; i < allProducts; i++) {
            const selectedProduct = await this.productSelect.nth(i).locator("h5").textContent()
            if (selectedProduct === product) {
                await this.productSelect.nth(i).locator("button.w-10").click()

                break
            }

        }

        await this.click(this.cartBtn)

        const productAddToCartMessage = await this.getText(this.productAddSuccessMessage)
        console.log(productAddToCartMessage)
        return productAddToCartMessage
    }

}