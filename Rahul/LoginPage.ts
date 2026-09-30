import { Page, Locator } from '@playwright/test'
import { BasePage } from './pages/BasePage'

export class LoginPage extends BasePage {
    //private page:Page
    private username: Locator
    private password: Locator
    private loginBtn: Locator
    private loginSuccess: Locator

    constructor(page: Page) {
        // this.page=page
        super(page)
        this.username = this.page.locator("input#userEmail")
        this.password = this.page.locator("input#userPassword")
        this.loginBtn = this.page.locator("input#login")
        this.loginSuccess = this.page.locator("div#toast-container")
    }

    async loginApp(url: string, username: string, password: string) {
         await this.navigate(url)
        await this.fill(this.username,username)
        await this.fill(this.password,password)
        await this.click(this.loginBtn)
        const message=await this.getText(this.loginSuccess)
        console.log(message)
        return message

        // await this.username.fill(username)
        // await this.password.fill(password)
        // await this.loginBtn.click()
        // const message = await this.loginSuccess.textContent()
        // console.log(message)
        // return message
    }
}