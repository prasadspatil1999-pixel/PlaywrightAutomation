import { expect } from '@playwright/test'
import { test } from '../Rahul/fixtures/testFixture'
import path from 'node:path'
import { ExcelUtils } from '../utils/ExcelUtils'

// let url="https://rahulshettyacademy.com/client/#/auth/login"
// let username="prasadpatil4@gmail.com"
// let password="Prasad@45634"

const filePath = path.join(__dirname, '../TestData/excel.xlsx')
const data =ExcelUtils.getDataExcel(filePath,"Login")
//console.log(data)
const loginData:any = data[0]

test("Login App",async({login,product,mycart,payment,order})=>
{
    //const login=new LoginPage(page)
    const message = await login.loginApp(loginData.url,loginData.username,loginData.password)
    console.log("Login Message: =", message)
     expect(message).toContain("Login")
     const addcartmessage=await product.selectProduct(loginData.productName)
     console.log("Add To Cart Message= ",addcartmessage)
     expect(addcartmessage).toContain(loginData.cartSuccessMsg)
     const myCartPage=await mycart.verifyMyCartPage()
     console.log(myCartPage)
     expect(myCartPage).toContain("My Cart")
     const productName =await mycart.verifyProductInCart(loginData.productName)
     console.log(productName )
     expect(productName ).toContain(loginData.productName)
     const productPrice = await mycart.verifyProductPrice()
     console.log("Product Price = ", productPrice)
     await mycart.verifyProductInStock()
     await mycart.verifySubTotalPrice()
     await mycart.verifyTotalPrice()
     await mycart.clickOnCheckOutBtn()
     await payment.PersonalInformation(loginData.cardNumber,loginData.cvvs,loginData.nameoncard)
     const email=await payment.ShippingInformation(loginData.city,loginData.country)
     expect(email).toBe(loginData.username)
     const invoice=await order.orderhistorey()
     expect(invoice).toBeTruthy()

    }) 


// data.forEach((loginData: any, index: number) => {

//     test(`Login Application ${index + 1}`, async ({ login }) => 
// {
//     //const login=new LoginPage(page)
//     const message = await login.loginApp(loginData.url,loginData.username,loginData.password)
//     console.log("Login Message: =", message)
//      expect(message).toContain("Login")
// })
//})