<script setup>
import { useStore } from "~/store/store";
import { storeToRefs } from "pinia";

const store = useStore();
const { UpdateInputs, userId ,toggleUpdateInvoice } = storeToRefs(store);
const { ResetUpdate } = store;

const name = ref(null);
const Qty = ref(null);
const price = ref(null);
const total = ref(null);
// ------------------------------------------------------------------

// add item to table
const addNewItem = () => {
  UpdateInputs.value.itemList.push({
    name: name.value,
    Qty: Qty.value,
    price: price.value,
    total: total.value,
  });
};

// ------------------------------------------------------------------

// remove item from table
const removeItem = (index) => {
  UpdateInputs.value.itemList.splice(index, 1);
};

// ------------------------------------------------------------------

// Update Invoice [method : put]
const updateData = async () => {
  try {
    const update = await $fetch(`/api/invoice/${userId.value}`, {
      method: "put",
      body: JSON.stringify(UpdateInputs.value),
    });
    if (update) {
      Reset();
      reloadNuxtApp();
      showInvoice.value = false;
    }
  } catch (err) {
    console.log(`error post data : ${err}`);
  }
};

// ------------------------------------------------------------------

onMounted(() => {
  UpdateInputs.value.invoiceDate = new Date().toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
});

watchEffect(() => {
  const fDate = new Date();
  const futureDate = fDate.setDate(
    fDate.getDate() + parseInt(UpdateInputs.value.paymentTerms)
  );
  if (UpdateInputs.value.paymentTerms) {
    UpdateInputs.value.paymentDate = new Date(futureDate).toLocaleDateString(
      "en-us",
      { year: "numeric", month: "short", day: "numeric" }
    );
  }
});
// ------------------------------------------------------------------

const Descard = ()=>{
  toggleUpdateInvoice.value = !toggleUpdateInvoice.value;
  if(!toggleUpdateInvoice.value){
    ResetUpdate()
  }
}
</script>

<template>
  <div class="update-invoice">
    <h3 class="title">Update Invoice</h3>

    <form class="form" @submit.prevent="updateData">
      <!-- Bill From -->
      <div class="formGroup billFrom">
        <h3 class="title">Bill From</h3>
        <div class="form-controll">
          <label for="streetAddress">Street Address</label>
          <input
            type="text"
            name="streetAddress"
            id="streetAddress"
            v-model="UpdateInputs.streetAddress"
            required
          />
        </div>

        <section class="groupC">
          <div class="form-controll">
            <label for="City">City</label>
            <input
              type="text"
              name="City"
              id="City"
              v-model="UpdateInputs.city"
              required
            />
          </div>
          <div class="form-controll">
            <label for="zipCode">Zip code</label>
            <input
              type="text"
              name="zipCode"
              id="zipCode"
              v-model="UpdateInputs.zipCode"
            />
          </div>
          <div class="form-controll">
            <label for="country">Country</label>
            <input
              type="text"
              name="country"
              id="country"
              v-model="UpdateInputs.country"
              required
            />
          </div>
        </section>
      </div>

      <!-- Bill To -->
      <div class="formGroup billTo">
        <h3 class="title">Bill To</h3>
        <div class="form-controll">
          <label for="clientName">Client Name</label>
          <input
            type="text"
            name="clientName"
            id="clientName"
            v-model="UpdateInputs.clientName"
            required
          />
        </div>
        <div class="form-controll">
          <label for="clientEmail">Client Email</label>
          <input
            type="email"
            name="clientEmail"
            id="clientEmail"
            v-model="UpdateInputs.clientEmail"
            required
          />
        </div>
        <div class="form-controll">
          <label for="clientAddress">Street Address</label>
          <input
            type="text"
            name="clientAddress"
            id="clientAddress"
            v-model="UpdateInputs.clientAddress"
            required
          />
        </div>

        <section class="groupC">
          <div class="form-controll">
            <label for="clientCity">City</label>
            <input
              type="text"
              name="clientCity"
              id="clientCity"
              v-model="UpdateInputs.clientCity"
              required
            />
          </div>
          <div class="form-controll">
            <label for="clientZipCode">Zip code</label>
            <input
              type="text"
              name="clientZipCode"
              id="clientZipCode"
              v-model="UpdateInputs.clientZipCode"
            />
          </div>
          <div class="form-controll">
            <label for="clientCountry">Country</label>
            <input
              type="text"
              name="clientCountry"
              id="clientCountry"
              v-model="UpdateInputs.clientCountry"
              required
            />
          </div>
        </section>
      </div>

      <!-- Invoice Date -->
      <div class="formGroup invoiceDate">
        <h3 class="title">Invoice Date</h3>
        <section class="groupDate">
          <div class="form-controll">
            <label for="invoiceDate">Invoice Date</label>
            <input
              type="text"
              name="invoiceDate"
              id="invoiceDate"
              v-model="UpdateInputs.invoiceDate"
              disabled
            />
          </div>

          <div class="form-controll">
            <label for="paymentDate">Payment Due</label>
            <input
              type="text"
              name="paymentDate"
              id="paymentDate"
              v-model="UpdateInputs.paymentDate"
              disabled
            />
          </div>
        </section>

        <div class="form-controll">
          <label for="paymentTerms">Payment Terms</label>
          <select
            name="paymentTerms"
            id="paymentTerms"
            v-model="UpdateInputs.paymentTerms"
            required
          >
            <option value="30">Net 30 Days</option>
            <option value="60">Net 60 Days</option>
          </select>
        </div>

        <div class="form-controll">
          <label for="productDescription">Product Description</label>
          <input
            type="text"
            name="productDescription"
            id="productDescription"
            v-model="UpdateInputs.productDescription"
            required
          />
        </div>
      </div>

      <!-- item List -->
      <div class="itemList">
        <h3 class="itemListTitle">Item List</h3>
        <table class="itemlistTable">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Qty</th>
              <th>price</th>
              <th>Totle</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in UpdateInputs.itemList" :key="index">
              <td>
                <input type="text" name="name" v-model="item.name" required />
              </td>
              <td>
                <input type="text" name="Qty" v-model="item.Qty" required />
              </td>
              <td>
                <span>$</span
                ><input
                  type="text"
                  name="price"
                  v-model="item.price"
                  required
                />
              </td>
              <td>{{ (item.total = item.price * item.Qty || 0) }}</td>
              <td>
                <button class="del" type="button" @click="removeItem(index)">
                  deL
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <button class="addNewItem" type="button" v-on:click="addNewItem">
          + Add New Item
        </button>
      </div>

      <!-- group Buttons -->
      <div class="groupButtons">
        <button class="discard" type="button" @click="Descard">Discard</button>
        <button class="create_update update" type="submit">
          update invoice
        </button>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.update-invoice {
  @apply bg-slate-950 shadow-md shadow-slate-600 text-gray-950 w-[500px] flex flex-col gap-5 px-3 py-4 absolute top-0 lg:left-[100px] transition-all z-10;

  // title [new invoice]
  .title {
    @apply font-semibold text-3xl text-white;
  }

  // Form
  form {
    @apply flex flex-col gap-5 justify-center w-full;

    //  formGroup
    .formGroup {
      @apply flex flex-col gap-2 justify-center;

      .title {
        @apply text-sm text-orange-400 font-semibold;
      }

      .form-controll {
        @apply flex flex-col gap-1 w-full;

        label {
          @apply text-white text-sm;
        }

        input {
          @apply text-black outline-none bg-slate-800 valid:bg-gray-200/100 focus:bg-gray-200/100 px-2 py-1 text-sm rounded-sm transition-all;
        }

        select {
          @apply text-white outline-none bg-slate-800 px-2 py-1 text-sm rounded-sm transition-all;
        }
      }

      .groupC,
      .groupDate {
        @apply flex gap-[2%];
      }

      .groupC {
        .form-controll {
          @apply w-[32%];
        }
      }
    }

    // table
    .itemList {
      @apply text-white flex flex-col gap-2;

      .itemListTitle {
        @apply text-gray-300 font-semibold;
      }

      .itemlistTable {
        @apply border-collapse w-full text-center;
        td {
          @apply my-1;
        }
        th,
        td {
          @apply text-[12px];
        }

        input {
          @apply w-[90%] border-none outline-none bg-slate-800 px-2;
        }

        .del {
          @apply text-red-400 text-[12px];
        }
      }

      .addNewItem {
        @apply bg-slate-800 hover:bg-slate-900 transition-all text-white text-[12px] font-medium w-[70%] mx-auto my-3 rounded-3xl px-4 py-2;
      }
    }

    //  groupButtons
    .groupButtons {
      @apply flex;

      button {
        @apply text-white font-medium px-5 py-2 mx-1 rounded-3xl transition-all;

        &.discard {
          @apply mr-auto bg-red-700 hover:bg-red-800;
        }

        &.saveDraft {
          @apply bg-blue-700 hover:bg-blue-800;
        }

        &.create_update {
          @apply hover:bg-green-800;
        }
        &.create {
          @apply bg-green-700 hover:bg-green-800;
        }
        &.update {
          @apply bg-yellow-700 hover:bg-yellow-800;
        }
      }
    }
  }
}
</style>
