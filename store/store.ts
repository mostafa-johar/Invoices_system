import { defineStore } from "pinia";

export const useStore = defineStore("invoice", () => {

  /*=================================================
    =================  States  ======================
  -==================================================*/

  // variable to toggle Form [new-invoice]
  const toggleNewInvoice = ref(false);

  // variable to toggle Form [update-invoice]
  const toggleUpdateInvoice = ref(false);

  // to toggle button between update and create
  const showUpdateForm = ref(false)

  // variable inputs
  const invoiceInput = ref<any>({
    streetAddress: "",
    city: "",
    zipCode: "",
    country: "",
    clientName: "",
    clientEmail: "",
    clientAddress: "",
    clientCity: "",
    clientZipCode: "",
    clientCountry: "",
    invoiceDate: "",
    paymentDate: "",
    paymentTerms: '',
    productDescription: "",
    itemList: [],
    status: {
      pending: true,
      paid: false,
    },
  });


  // updata inputs
  const UpdateInputs = ref<any>({
    streetAddress: "",
    city: "",
    zipCode: "",
    country: "",
    clientName: "",
    clientEmail: "",
    clientAddress: "",
    clientCity: "",
    clientZipCode: "",
    clientCountry: "",
    invoiceDate: "",
    paymentDate: "",
    paymentTerms: '',
    productDescription: "",
    itemList: [],
    status: {
      pending: true,
      paid: false,
    },
  });

  // invoices => get all Data here
  const InvoiceArr = ref<any>([]);

  // filter List
  const statuNow = ref('All')

  //  Array to add data on it
  const invoice = ref<any>([]);

  const userId = ref('')
  
  /*=================================================
    =================  Actions  ======================
  -==================================================*/

  // Reset data
  const Reset = () => {
    invoiceInput.value = {
      streetAddress: "",
      city: "",
      zipCode: "",
      country: "",
      clientName: "",
      clientEmail: "",
      clientAddress: "",
      clientCity: "",
      clientZipCode: "",
      clientCountry: "",
      invoiceDate: "",
      paymentDate: "",
      paymentTerms: '',
      productDescription: "",
      itemList: [],
      status: {
        pending: true,
        paid: false,
      }

    }

  }
  const ResetUpdate = () => {
    UpdateInputs.value = {
      streetAddress: "",
      city: "",
      zipCode: "",
      country: "",
      clientName: "",
      clientEmail: "",
      clientAddress: "",
      clientCity: "",
      clientZipCode: "",
      clientCountry: "",
      invoiceDate: "",
      paymentDate: "",
      paymentTerms: '',
      productDescription: "",
      itemList: [],
      status: {
        pending: true,
        paid: false,
      }

    }

  }

  return {
    toggleNewInvoice,
    toggleUpdateInvoice,
    invoiceInput,
    InvoiceArr,
    Reset,
    ResetUpdate,
    statuNow,
    showUpdateForm,
    invoice,
    UpdateInputs,
    userId,
  };
});
