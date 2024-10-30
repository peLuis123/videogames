<template>
  <v-card>
    <v-navigation-drawer v-model="drawer">
      <div class="nav-header">
        <slot name="nav-header">
          <RouterLink to="/" class="app-logo app-title-wrapper">
            <div class="d-flex" v-html="logo" />

            <h1
              class="font-weight-medium leading-normal text-xl text-uppercase"
            >
              plantilla
            </h1>
          </RouterLink>
        </slot>
      </div>
      <v-list nav>
        <v-list-item
          v-for="(item, index) in filteredMenuItems"
          :key="index"
          :prepend-icon="item.icon"
          :title="item.title"
          :to="item.value"
          :value="item.value"
        />
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useAuthStore } from "@/store/authStore";

import logo from "@/assets/images/logo.svg?raw";
 
const authStore = useAuthStore();

const props = defineProps({
  drawer: Boolean,
});
 
const menuItems = [
  {
    icon: "mdi-view-dashboard",
    title: "users",
    value: "/",
    roles: [ "admin"],
  },
  {
    icon: "mdi-account-alert",
    title: "Videojuegos",
    value: "/games",
    roles: ["user", "admin"],
  },
  {
    icon: "mdi-account-alert",
    title: "biblioteca",
    value: "/biblioteca",
    roles: ["user"],
  },
];
 
const filteredMenuItems = computed(() => {
  return menuItems.filter((item) => item.roles.includes(authStore.rol));
});

const drawer = ref(props.drawer);

watch(
  () => props.drawer,
  (newValue) => {
    drawer.value = newValue;
  }
);
</script>

<style scoped>
.app-logo {
  display: flex;
  align-items: center;
  column-gap: 0.75rem;
}

.app-logo-title {
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.75rem;
  text-transform: uppercase;
}

.items {
  display: flex;
  align-items: center;
}

.text-list {
  padding-left: 26px;
}

.nav-header {
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
