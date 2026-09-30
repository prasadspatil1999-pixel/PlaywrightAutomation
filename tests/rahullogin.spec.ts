import { test, expect } from '@playwright/test'
import { ExcelUtils } from "../utils/ExcelUtils";
import path from 'path'
import { LoginPage } from "../pages/LoginPage";

const filePath = path.join(__dirname, "../TestData/excel.xlsx")
const sheetname = "Login"
let rahul
try {
    rahul = ExcelUtils.getDataExcel(filePath, sheetname)
}
catch (error) {
    console.log(error)
}

let lo
test.beforeEach(async ({ page }) => {
    lo = new LoginPage(page)
})
for (let product of rahul) {
    test(`add to cat ${product.productName}`, async () => {
        await lo.launchURL(product.url)
        await lo.loginTheApp(product.username, product.password)
    })
}



