<script setup>
import { useStore } from "~/store/store";
import { storeToRefs } from "pinia";

const store = useStore();
const { statuNow, toggleNewInvoice } = storeToRefs(store);

defineModel("count");

const refItem = ref(null);

// to show filterList [pending -paid -all]
const showFilter = ref(false);

// ------------------------------------------------------------------

// to toggle active in <li> backgroundColor
const ChangeActive = (e, item) => {
  // remove active class form li
  refItem.value.forEach((Li) => {
    Li.classList.remove("active");
  });

  if (e.target.textContent == item) {
    e.target.classList.add("active");
    statuNow.value = item;
  }
};
</script>

<template>
  <section class="navInvoice">
    <div class="container">
      <!-- col-1 -->
      <div class="info">
        <h3 class="title">Invoices</h3>
        <p>There are {{ count.length }} total invoices</p>
      </div>

      <!-- col-2 -->
      <div class="filter_and_create">
        <div class="filter" @click="showFilter = !showFilter">
          <span
            >Filter By Status :
            <span
              :class="
                statuNow == 'paid'
                  ? 'text-teal-400'
                  : statuNow == 'pending'
                  ? 'text-orange-400'
                  : 'text-purple-400'
              "
              >{{ statuNow }}</span
            ></span
          >
          <img
            src="../assets/imgs/down-chevron.png"
            alt="down"
            width="10"
            height="10"
          />
          <ul class="list" v-show="showFilter">
            <li
              @click="ChangeActive($event, item)"
              v-for="(item, index) in ['All', 'pending', 'paid']"
              :key="index"
              ref="refItem"
            >
              {{ item }}
            </li>
          </ul>
        </div>

        <button
          class="createBtn"
          type="button"
          v-on:click="toggleNewInvoice = !toggleNewInvoice"
        >
          <span>+</span> New invoice
        </button>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.navInvoice {
  .container {
    @apply flex gap-2 justify-between flex-wrap items-center;
    // col-1 [info]
    .info {
      .title {
        @apply text-2xl font-semibold text-white;
      }
      p {
        @apply text-[12px] text-gray-200;
      }
    }

    // col-2 [filter_and_create]
    .filter_and_create {
      @apply flex gap-5;
      .filter {
        @apply flex gap-1 items-center text-[12px] text-white relative cursor-pointer;
        img {
          @apply object-contain;
        }
        .list {
          @apply absolute left-0 top-[30px] bg-gray-100 text-gray-950 font-semibold w-full p-1 transition-all;
          .active {
            @apply bg-blue-400;
          }
        }
      }

      .createBtn {
        @apply flex gap-2 items-center px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white text-sm font-medium rounded-3xl;
        span {
          @apply bg-white text-purple-700 font-bold w-6 h-6 rounded-full flex justify-center items-center;
        }
      }
    }
  }
}
</style>
