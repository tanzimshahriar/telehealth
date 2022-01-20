<template>
  <div class="flex items-end justify-end pt-6 px-6 md:px-12 lg:px-16 xl:px-32" :class="$route.path==='/new'? 'justify-between' : ''">
    <!--Back navigation-->
    <nuxt-link
        aria-label="back"
        v-if="$route.path === '/new'"
        to="/"
        class="flex items-center text-blue-600 py-2 px-3"
        ><fa class="block mr-2" :icon="faArrowLeft" />Back
      </nuxt-link>

  </div>
</template>
<script>
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default {
  methods: {
    save() {
      console.log("save");
    },
  },
  computed: {
    faArrowLeft() {
      return faArrowLeft;
    },
  },
};
</script>
<style lang=""></style>
