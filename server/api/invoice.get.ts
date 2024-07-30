import invoiceModel from "../plugins/models/invoice.model"

export default defineEventHandler(async()=>{
    try{
        const invoices = await invoiceModel.find({})

        return {
            invoices
        }
    }catch(err){
        console.log(err)
    }
})