import xlsx from 'xlsx'

export class ExcelUtils {
    static getDataExcel(filePath: string, sheetName: string) {
        try {
            const workbook = xlsx.readFile(filePath)
            const sheet = workbook.Sheets[sheetName]
            const data = xlsx.utils.sheet_to_json(sheet)
            return data
        }
        catch (error) {
            console.log(error)
            return[]
        }
    }
}


