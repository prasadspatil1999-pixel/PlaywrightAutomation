import{Locator,Page} from 'playwright'

export class loginpageprasad{
    private page:Page
    private username:Locator

    constructor(test:Page)
    {
        this.page=test
        this.username=this.page.locator("")
    }
    async lo()
    {
        this.username
    }
}