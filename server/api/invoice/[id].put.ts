import invoiceModel from "~/server/plugins/models/invoice.model"


export default defineEventHandler(async(event)=>{
    try{
        const { id } = event.context.params as {id :string}
        const body = await readBody(event) 
        const invoice = await invoiceModel.findByIdAndUpdate({_id : id},{
            streetAddress: body.streetAddress,
            city: body.city,
            zipCode: body.zipCode,
            country: body.country,
            clientName: body.clientName,
            clientEmail: body.clientEmail,
            clientAddress: body.clientAddress,
            clientCity: body.clientCity,
            clientZipCode: body.clientZipCode,
            clientCountry: body.clientCountry,
            invoiceDate: body.invoiceDate,
            paymentDate: body.paymentDate,
            paymentTerms: body.paymentTerms,
            productDescription: body.productDescription,
            itemList: body.itemList,
            status: {
                pending: body.status.pending,
                paid: body.status.paid
            }
        })
      
        return {invoice : invoice}
    }catch(err){
        console.log(err)
    }
})