import mongoose from "mongoose";

const useSchema = new mongoose.Schema({
    streetAddress: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    clientName: {
        type: String,
        required: true
    },
    clientEmail: {
        type: String,
        required: true
    },
    clientAddress: {
        type: String,
        required: true
    },
    clientCity: {
        type: String,
        required: true
    },
    clientZipCode: {
        type: String,
        required: true
    },
    clientCountry: {
        type: String,
        required: true
    },
    invoiceDate: {
        type: String,
        required: true
    },
    paymentDate: {
        type: String,
        required: true
    },
    paymentTerms: {
        type: Number,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    itemList: {
        type : Array,
        required : true
    },
    status : {
         pending: {
            type: Boolean ,
            required : true
         },
         paid: {
            type: Boolean,
            required: true
         }
    }

}, {
    timestamps: true
})

export default mongoose.model('invoice', useSchema)