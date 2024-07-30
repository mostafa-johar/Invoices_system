<script setup>
import { useStore } from "~/store/store";
import { storeToRefs } from "pinia";

const store = useStore();
const { invoice, toggleUpdateInvoice, UpdateInputs, userId } =
  storeToRefs(store);

// route [params]
const route = useRoute();
const router = useRouter();

useHead({
  title: `user invoice`,
});
// ------------------------------------------------------------------

// get invoice [methods : get] ========
onMounted(async () => {
  try {
    const data = await $fetch(`/api/invoice/${route.params.id}`);
    invoice.value = [data.invoices];
  } catch (err) {
    console.log("there are errors in get invoice");
  }
});

// ------------------------------------------------------------------

// update status [methods : put] ========
const updateStatus = async () => {
  let targetInvoice = invoice.value[0];

  // toggle pending & paid
  targetInvoice.status.pending = !targetInvoice.status.pending;
  targetInvoice.status.paid = !targetInvoice.status.paid;

  await $fetch(`/api/invoice/${route.params.id}`, {
    method: "PUT",
    body: JSON.stringify({ ...targetInvoice }),
  });
};

// ------------------------------------------------------------------

// Delete invoice [methods : Delete] ======
const deleteInvoice = async () => {
  const data = await $fetch(`/api/invoice/${route.params.id}`, {
    method: "DELETE",
  });

  if (data) {
    router.push("/");
  }
};

// ------------------------------------------------------------------

// update invoice [methods : put] ======
const EditInvoice = async () => {
  toggleUpdateInvoice.value = !toggleUpdateInvoice.value;

  UpdateInputs.value = { ...invoice.value[0] };
  userId.value = route.params.id;
};
</script>

<template>
  <div class="details">
    <!-- update Invoice invoice Form -->
    <transition name="invoice">
      <UpdateInvoice v-if="toggleUpdateInvoice" />
    </transition>
    <!------------------------------------------------------- ===-->
    <div class="container">
      <!-- Go Back -->
      <nuxt-link to="/" class="flex gap-2 items-center text-blue-400 text-sm">
        <img
          src="../../assets/imgs/left-chevron.png"
          alt="left-chevron.png"
          width="10"
          height="10"
          class="object-contain"
        />
        Go back
      </nuxt-link>

      <!-- Details -->
      <template v-if="invoice.length > 0">
        <section class="content" v-for="item in invoice" :key="item._id">
          <!-- col-1 -->
          <div class="header box">
            <div class="status">
              <p>Status :</p>
              <div v-if="item.status.pending" class="flex items-center gap-1">
                <span class="w-2 h-2 bg-orange-500 rounded-full"></span>
                pending
              </div>
              <div v-if="item.status.paid" class="flex items-center gap-1">
                <span class="w-2 h-2 bg-teal-500 rounded-full"></span>
                paid
              </div>
            </div>

            <div class="groupButtom">
              <button class="edit" type="button" @click="EditInvoice">
                Edit
              </button>
              <button class="delete" type="button" @click="deleteInvoice">
                Delete
              </button>
              <button
                class="mark"
                :class="`${item.status.pending ? 'paid' : 'pending'}`"
                type="button"
                @click="updateStatus"
              >
                {{ item.status.pending ? "Mark as paid" : "Mark as pending" }}
              </button>
            </div>
          </div>

          <!-- col-2 -->
          <div class="info box">
            <!-- col-1 -->
            <section>
              <div class="id_Description">
                <h3><span class="text-gray-400">#</span>{{ item.city }}</h3>
              </div>

              <div class="address">
                <p>{{ item.streetAddress }}</p>
                <p>{{ item.city }}</p>
                <p>{{ item.country }}</p>
              </div>
            </section>

            <!-- col-2 -->
            <section>
              <!-- col-1 -->
              <div class="invoiceDate">
                <div>
                  <h4>Invoice Date</h4>
                  <p>{{ item.invoiceDate }}</p>
                </div>
                <div>
                  <h4>payment Date</h4>
                  <p>{{ item.paymentDate }}</p>
                </div>
              </div>

              <!-- col-2 -->
              <div class="billTo">
                <h4>Bill To</h4>
                <p class="name">{{ item.clientName }}</p>
                <div class="address">
                  <p>{{ item.clientAddres }}</p>
                  <p>{{ item.clientCity }}</p>
                  <p>{{ item.clientCountry }}</p>
                </div>
              </div>

              <!-- col-3 -->
              <section class="sendTo">
                <div>
                  <h4>Send To</h4>
                  <p>{{ item.clientEmail }}</p>
                </div>
              </section>
            </section>

            <!-- col-3 -->
            <section class="itemName">
              <table>
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>QTY.</th>
                    <th>price</th>
                    <th>total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(prod, index) in item.itemList" :key="index">
                    <td>{{ prod.name }}</td>
                    <td>{{ prod.Qty }}</td>
                    <td>{{ prod.price }}</td>
                    <td>{{ prod.total }}</td>
                  </tr>
                </tbody>
              </table>
              <!-- <div class="AmountDue">
                 <div>Amount Due</div>
                 <div>
                   ${{
                     item.itemList.reduce((p, c) => Number(c.total) + Number(p), 0)
                   }}
                 </div>
               </div> -->
            </section>
          </div>
        </section>
      </template>

      <!----- Start else ------->
      <section v-else class="text-white mx-auto w-full text-center">
        <img
          src="../../assets/imgs/NoData.png"
          alt="NoDataFound"
          class="inline w-[250px] h-[250px] object-contain"
        />
        <p>There are No Invoices, Go back and Create New . . .</p>
      </section>
      <!----- End else ------->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.details {
  //  Form invoice [absolute]
  .invoice-enter-active,
  .invoice-leave-active {
    transition: 0.5s ease-in-out all;
  }
  .invoice-enter-from,
  .invoice-leave-to {
    transform: translateX(-700px);
  }

  // ------------------------------------------------

  .content {
    // col-1
    .header {
      @apply flex justify-between items-center gap-2 text-white;

      // left
      .status {
        @apply text-[12px] flex gap-3 items-center;
      }

      // right
      .groupButtom {
        @apply flex gap-2 items-center;

        button {
          @apply py-1 px-3 text-sm transition-all;

          &.edit {
            @apply bg-slate-800 hover:bg-slate-950;
          }

          &.delete {
            @apply bg-red-800 hover:bg-red-950;
          }
        }
      }
    }

    // ------------------------------------

    // col-2
    .info {
      @apply flex flex-col gap-3 text-white;

      section {
        // col-1
        &:first-of-type {
          @apply flex justify-between gap-2 items-center;

          .id_Description {
            h3 {
              @apply text-xl mb-1;
            }
          }

          .address {
            @apply text-[12px] text-right;
          }
        }

        // --------------------------

        // col-2 invoiceDate
        &:nth-of-type(2) {
          @apply flex gap-3;

          h4 {
            @apply text-[10px] text-gray-200 mb-1;
          }

          p {
            @apply text-[12px] text-gray-100;
          }
          // ------------

          // col-1
          .invoiceDate {
            @apply flex flex-col gap-3 w-[30%];
          }

          // -------------

          // col-2
          .billTo {
            @apply w-[30%];

            .name {
              @apply text-sm font-semibold mb-3;
            }

            .address {
              @apply text-[10px];
            }
          }

          // ------------

          // col-3 SendTo
          .sendTo {
            @apply flex flex-col gap-0 text-sm;
          }
        }

        // -----------

        // col-3 itemName
        &:nth-of-type(3) {
          @apply rounded-xl shadow-xl bg-slate-800 overflow-hidden pt-3 p-3;
          table {
            @apply border-collapse w-full p-3;
            td,
            th {
              @apply p-3 text-sm border-[1px] border-gray-50/50 text-start;
            }
          }
          .AmountDue {
            @apply bg-slate-950 p-3 flex justify-between gap-3 items-center;
            div {
              &:first-of-type {
                @apply text-[12px];
              }
              &:last-of-type {
                @apply text-2xl font-medium;
              }
            }
          }
        }
      }
    }
  }
}
</style>
