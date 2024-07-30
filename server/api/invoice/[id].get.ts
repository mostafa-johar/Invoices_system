import invoiceModel from "~/server/plugins/models/invoice.model"


export default defineEventHandler(async(event)=>{
    const { id } = event.context.params as {id :string}
    try{
        const invoices = await invoiceModel.findById({_id : id})

        return {
            invoices
        }
    }catch(err){
        console.log(err)
    }
})