<template>
  <v-card class="game-card" min-width="250px" max-width="350" min-height="420px">
    <v-img :src="`${apiHost}${game.imagePath}`" height="200px">
      <v-card-title class="white--text">{{ game.title }}</v-card-title>
    </v-img>

    <v-card-subtitle class="subtitle">{{ game.genre }}</v-card-subtitle>
    <v-card-text>
      <p>{{ game.description }}</p>
      <p>Fecha de lanzamiento: {{ new Date(game.releaseDate).toLocaleDateString() }}</p>
      <div v-if="game.accessType.purchase && game.price > 0">
        <strong>Precio:</strong> ${{ game.price }}
      </div>
    </v-card-text>
    <v-spacer></v-spacer>
    <v-card-actions>
      <v-chip v-if="game.accessType.subscription" color="primary" outlined class="mr-2">
        Suscripción
      </v-chip>
      <v-chip v-if="game.accessType.purchase" color="success" outlined class="mr-2">
        Compra
      </v-chip>
   
    </v-card-actions>
    <v-divider v-if="rol === 'admin'" />
    <v-card-actions  class="action-buttons">
      <v-btn v-if="rol === 'admin'" color="blue darken-2" @click="$emit('edit', game)" text>Editar</v-btn>
      <v-btn v-if="rol === 'admin'" color="red darken-2" @click="$emit('delete', game)" text>Eliminar</v-btn>
      <v-btn v-if="game.accessType.subscription && rol === 'user'" color="blue darken-2" @click="$emit('buyGame', game)" text>Comprar</v-btn>
      <v-btn v-if="game.accessType.purchase && rol === 'user'" color="blue darken-2" @click="$emit('subGame', game)" text>Subscribirse</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from "@/store/authStore";

const props = defineProps(['game']);
const authStore = useAuthStore();
const rol = computed(() => authStore.rol);
const apiHost = import.meta.env.VITE_API_HOST;
</script>

<style scoped>
.game-card {
  background-color: #333;
  color: #fff;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.subtitle {
  font-weight: bold;
  font-size: 1.1em;
}
.action-buttons {
  margin-top: auto;
}
</style>
