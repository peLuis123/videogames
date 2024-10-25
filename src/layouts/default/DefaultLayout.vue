<template>
  <v-app>
    <default-view />
    <navigationDrawer :drawer="drawer"/>
    <navbar @some-event="handlerNavDraw" />
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import DefaultView from "./ViewLayout.vue";
import navigationDrawer from "@/components/NavigationDrawer.vue";
import navbar from '@/components/NavBar.vue';
const drawer = ref(true);
function handlerNavDraw() {
  drawer.value = !drawer.value;
}
</script>
