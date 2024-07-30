<script setup>

// all invoices
defineProps({
  invoices: {
    type: Array,
    required: true,
  }
});
</script>

<template>
  <section class="invoices">
    <div class="container">
      <!-----Start Box ------->
      <section v-if="invoices.length">
        <NuxtLink
          :to="`invoice/${item._id}`"
          class="box"
          v-for="(item, index) in invoices"
          :key="item._id"
        >
          <div>#{{ index + 1 }}</div>
          <div>{{ new Date().toDateString() }}</div>
          <div>{{ item.clientName }}</div>
          <div>
            ${{
              item.itemList.reduce((p, c) => Number(c.total) + Number(p), 0)
            }}
          </div>

          <div v-if="item.status.pending" class="flex items-center gap-1">
            <span class="w-2 h-2 bg-orange-500 rounded-full"></span>
            pending
          </div>
          <div v-if="item.status.paid" class="flex items-center gap-1">
            <span class="w-2 h-2 bg-teal-500 rounded-full"></span>
            paid
          </div>

          <img
            src="../assets/imgs/right-chevron.png"
            alt="right-chevron.png"
            width="10"
            height="10"
            class="object-contain"
          />
        </NuxtLink>
      </section>
      <!-----End Box ------->

      <!----- Start else ------->
      <section v-else class="text-white mx-auto w-full text-center">
        <img
          src="../assets/imgs/NoData.png"
          alt="NoDataFound"
          class="inline w-[250px] h-[250px] object-contain"
        />
        <p>There are No Invoices, Create New . . .</p>
      </section>
      <!----- End else ------->
    </div>
  </section>
</template>

<style lang="scss" scoped>
.box {
  @apply flex justify-between items-center gap-2 text-white;
  div {
    @apply text-[12px];
  }
}
</style>
