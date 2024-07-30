<script setup>
import { useStore } from "~/store/store";
import { storeToRefs } from "pinia";

const store = useStore();
const { InvoiceArr, toggleNewInvoice, statuNow } = storeToRefs(store);

// -----------------------------------------------------------------

// --- Start get All Data -------------
const { data: invoices } = await useFetch("/api/invoice");
InvoiceArr.value = invoices.value.invoices;
// --- End get All Data -------------

// ------------------------------------------------------------------

// filter invoice by status
const filterStatus = computed(() => {
  // put invoice Here
  let table = InvoiceArr.value;

  if (statuNow.value == "pending") {
    table = table.filter((item) => {
      return item.status["pending"];
    });
  }

  if (statuNow.value == "paid") {
    table = table.filter((item) => {
      return item.status["paid"];
    });
  }

  return table;
});

</script>

<template>
  <div class="Home">
    <!-- New Invoice invoice Form -->
    <transition name="invoice">
      <NewInvoice v-if="toggleNewInvoice" />
    </transition>

    <!-- col-1 right [content] -->
    <div class="app-content">
      <!-- title + filter by status and create new invoice -->
      <nav-invoice :count="filterStatus" />

      <!-- show invoices -->
      <ShowInvoice :invoices="filterStatus" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Home {
  //  Form invoice [absolute]
  .invoice-enter-active,
  .invoice-leave-active {
    transition: 0.5s ease-in-out all;
  }
  .invoice-enter-from,
  .invoice-leave-to {
    transform: translateX(-700px);
  }
  // app-conent [pages]
  .app-content {
    // --------------------------------
    @apply w-full;
  }
}
</style>
