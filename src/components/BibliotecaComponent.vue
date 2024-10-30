<template>
  <div class="d-flex">
    <v-col
      class="mb-5"
      cols="12"
      sm="6"
      md="4"
      v-for="game in gamesLibrary"
      :key="game._id"
    >
      <v-card
        class="game-card"
        min-width="250px"
        max-width="350"
        min-height="300px"
      >
        <v-img :src="`${apiHost}${game.videojuego.imagePath}`" height="200px">
          <v-card-title class="white--text">{{
            game.videojuego.title
          }}</v-card-title>
        </v-img>

        <v-card-subtitle class="subtitle">{{
          game.videojuego.genre
        }}</v-card-subtitle>
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-chip color="success" outlined class="mr-2">
            {{ game.accessType }}
          </v-chip>
        </v-card-actions>

        <v-card-actions class="action-buttons">
          <v-btn color="blue darken-2" text>Jugar</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { Library as LibraryAPI } from "@/services/biblioteca";
import VideoJuegoCard from "@/components/VideoJuegoCard.vue";
const apiHost = import.meta.env.VITE_API_HOST;
const gamesLibrary = ref([]);
const getAllLibrary = async () => {
  const response = await LibraryAPI.getLibrary();
  //   const videojuegos = response.data.data.map((item) => item.videojuego);
  gamesLibrary.value = response.data.data;
};
onMounted(() => {
  getAllLibrary();
});
</script>
