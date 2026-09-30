import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
export class MyCartPage extends BasePage {
    private myCartPage: Locator
    private addProductName: Locator
    private addProductPrice: Locator
    private addProductInStock: Locator
    private subTotal: Locator
    private total: Locator
    private checkOutBtn: Locator

    constructor(page: Page) {
        super(page)
        this.myCartPage = this.page.locator("div.heading h1")
        this.addProductName = this.page.locator("div.cartSection h3")
        this.addProductPrice = this.page.locator("div.cartSection p").nth(1)
        this.addProductInStock = this.page.locator("div.cartSection .stockStatus")
        this.subTotal = this.page.locator("span.value").first()
        this.total = this.page.locator("span.value").last()
        this.checkOutBtn = this.page.locator("button.btn-primary").last()
        


    }
    async verifyMyCartPage() {
        const myCartPage = await this.getText(this.myCartPage)
        console.log(myCartPage)
        return myCartPage
    }
    async verifyProductInCart(product: string) {
        const productName = await this.getText(this.addProductName)
        console.log("Expected Product = ", product)
        console.log("Cart Product = ", productName)
        return productName
    }

    async verifyProductPrice() {
        const productPrice = await this.getText(this.addProductPrice)
        console.log("Product Price = ", productPrice)
        return productPrice

    }
    async verifyProductInStock() {
        const productInStock = await this.getText(this.addProductInStock)
        console.log("Product stockStatus = ", productInStock)
        return productInStock
    }
    async verifySubTotalPrice() {
        const subtotal = await this.getText(this.subTotal)
        console.log("Product subTotalPrice= ", subtotal)
        return subtotal
    }
    async verifyTotalPrice()
    {
        const productTotalPrice=await this.getText(this.total)
        console.log("Product TotalPrice= ", productTotalPrice)
        return productTotalPrice
    }
    async clickOnCheckOutBtn()
    {
        await this.click(this.checkOutBtn)
    }




}