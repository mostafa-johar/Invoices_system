import invoiceModel from "../plugins/models/invoice.model"

export default defineEventHandler(async(event)=>{
    try{
        const body = await readBody(event)
          
           await invoiceModel.create({
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
        
        return 'invoice is Created'
        
    }catch(err){
        console.log(err)
    }
})