import { Locator,Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import path from "node:path";
export class orderpage extends BasePage{
    private invoiceNumber:Locator
    private downlaodCsv:Locator
    private orderHistoreyPage:Locator

    constructor(page:Page)
    {
        super(page)
        this.invoiceNumber=this.page.locator("td.em-spacer-1 label").last()
        this.downlaodCsv=this.page.getByText("Click To Download Order Details in CSV")
        this.orderHistoreyPage=this.page.locator("td.em-spacer-1 label").first()
    }
    async orderhistorey()
    {
        await this.click(this.invoiceNumber)
        const invoicenumber=await this.getText(this.invoiceNumber)
        console.log(invoicenumber)
        const invoice=invoicenumber?.replaceAll("|","").trim()
        console.log(invoice)
        return invoice
        const downlaod=this.page.waitForEvent("download")
        await this.click(this.downlaodCsv)
        const downloadresult=await downlaod
        const downloaddir=path.join(__dirname,'../../downlaod')
        console.log(downloaddir)
        const filename= downloadresult.suggestedFilename()
        console.log(filename)
        const filepath= path .join(downloaddir,filename)
        await downloadresult.saveAs(filepath)
        await this.click(this.orderHistoreyPage)
    }

}