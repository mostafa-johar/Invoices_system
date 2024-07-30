<script setup>
import { useStore } from "~/store/store";
import { storeToRefs } from "pinia";

const store = useStore();
const { toggleNewInvoice , toggleUpdateInvoice } = storeToRefs(store);
const mobile = ref(null);

//-------- Start check if using Mobile  -----------------
const checkMobile = () => {
  let windows = window.innerWidth;
  if (windows > 767) {
    mobile.value = false;
    return;
  }
  mobile.value = true;
};
onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);

  // to close Form By 'Esc' Key
  window.addEventListener("keydown", (event) => {
    if (event.key == "Escape" && (toggleNewInvoice.value || toggleUpdateInvoice.value)) {
      toggleNewInvoice.value = false;
      toggleUpdateInvoice.value = false;
    }
  });
});
//-------- End check if using Mobile  -----------------
</script>
<template>
  <div class="default" v-if="!mobile">

    <!-- col-1 left [icon] -->
    <div class="invoiceIcon">
      <img src="../assets/imgs/invoice.png" alt="invoice.png" />
    </div>

    <!-- col-2 pages -->
    <main class="pages">
      <slot />
    </main>
  </div>
  <div
    class="text-white w-full h-screen flex justify-center items-center"
    v-else
  >
    Sorry, This app is not Support Mobile and Tablet
  </div>
</template>
<style lang="scss" scoped>
.default {
  @apply hidden md:flex relative;

  // col-1 icon
  .invoiceIcon {
    @apply fixed hidden lg:block w-[100px] h-screen text-center bg-slate-800 z-50;
    img {
      @apply w-[100px] inline-block;
    }
  }

  // col-2 pages
  .pages {
    @apply flex-1;
  }
}
</style>
