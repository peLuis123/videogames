<template>
  <v-app-bar :elevation="0">
    <v-app-bar-nav-icon variant="text" @click="$emit('someEvent')" />

    <v-toolbar-title>GameHub</v-toolbar-title>

    <v-spacer />
    <v-btn @click="toggleTheme" icon>
      <v-icon>{{
        isDarkTheme ? "mdi-weather-sunny" : "mdi-moon-waxing-crescent"
      }}</v-icon>
    </v-btn>
    <div class="mr-2">
      {{ user.name }}
    </div>
    <v-menu min-width="200px" rounded>
      <template #activator="{ props }">
        <v-btn icon size="45" v-bind="props">
          <v-avatar>
            <v-img alt="John" src="https://cdn.vuetifyjs.com/images/john.jpg" />
          </v-avatar>
        </v-btn>
      </template>
      <v-card>
        <v-card-text>
          <div class="mx-auto text-center">
            <h3>{{ user.name }}</h3>
            <p class="text-caption mt-1">
              {{ user.email }}
            </p>
            <v-divider class="my-3" />
            <router-link to="/">
              <v-btn variant="text" rounded>
                <v-icon>mdi-account</v-icon> Perfil
              </v-btn>
            </router-link>
            <v-divider class="my-3" />
            <router-link to="/">
              <v-btn variant="text" rounded>
                <v-icon>mdi-lock-outline</v-icon> Cambiar contraseña
              </v-btn>
            </router-link>
            <v-divider class="my-3" />
            <!-- <router-link to="/login">
              <v-btn variant="text" rounded>
                <v-icon>mdi-exit-to-app</v-icon>Salir 
              </v-btn>
            </router-link> -->
            <v-btn @click="logout" variant="text" rounded>
              <v-icon>mdi-exit-to-app</v-icon> Salir
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script setup>
import { ref, computed } from "vue";
import { useTheme } from "vuetify";
const { global } = useTheme();

import { Auth as AuthAPI } from "@/services/auth";
import { useAuthStore } from "@/store/authStore";
const authStore = useAuthStore(); 
const isDarkTheme = computed(() => global.name.value === "dark");

const toggleTheme = () => {
  global.name.value = isDarkTheme.value ? "light" : "dark";
};
const user = computed(
  () =>
    authStore.authUser || {
      initials: "NN",
      name: "Usuario no identificado",
      email: "correo@ejemplo.com",
    }
);
const logout = async () => {
  try {
    authStore.logout()
    await AuthAPI.Logout();
    
    window.location.href = "/login";
  } catch (error) {
    console.error("Error during logout:", error);
  }
};
</script>
