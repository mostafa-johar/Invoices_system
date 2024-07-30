import invoiceModel from "~/server/plugins/models/invoice.model"


export default defineEventHandler(async(event)=>{
    const { id } = event.context.params as {id :string}
    try{
        await invoiceModel.findByIdAndDelete({_id : id})
        return 'invoice is deleted'
            
    }catch(err){
        console.log(err)
    }
})