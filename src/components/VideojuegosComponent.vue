<template>
  <v-btn color="primary" @click="openAddModal">Agregar Videojuego</v-btn>
  <v-row class="mt-4" dense>
    <v-col
      class="mb-5"
      cols="12"
      sm="6"
      md="4"
      v-for="game in games"
      :key="game._id"
    >
      <VideoJuegoCard
        :game="game"
        @edit="openEditModal"
        @delete="openDeleteModal"
        @buyGame="buyGame"
        @subGame="subGame"
      />
    </v-col>
  </v-row>
  <AgregarVideojuegoModal
    v-model:dialog="isAddModalOpen"
    @close="closeAddModal"
    @add="addGame"
  />

  <EditarVideojuegoModal
    v-model:dialog="isEditModalOpen"
    :game="selectedGame"
    @close="closeEditModal"
    @edit="editGame"
  />

  <EliminarVideojuegoModal
    v-model:dialog="isDeleteModalOpen"
    :gameId="selectedGameId"
    @close="closeDeleteModal"
    @delete="deleteGame"
  />
</template>

<script setup>
import { ref, onMounted } from "vue";
import VideoJuegoCard from "@/components/VideoJuegoCard.vue";
import AgregarVideojuegoModal from "@/components/VideojuegoAgregarModal.vue";
import EditarVideojuegoModal from "@/components/VideojuegoEditarModal.vue";
import EliminarVideojuegoModal from "@/components/VideojuegoEliminarModal.vue";
import { Game as GameAPI } from "@/services/videoJuego";
import { Library as LibraryAPI } from "@/services/biblioteca";
const games = ref([]);
const selectedGame = ref(null);
const selectedGameId = ref(null);
const isAddModalOpen = ref(false);
const isEditModalOpen = ref(false);
const isDeleteModalOpen = ref(false);

const openAddModal = () => (isAddModalOpen.value = true);

const closeAddModal = () => (isAddModalOpen.value = false);
const getAllGames = async () => {
  const response = await GameAPI.getGames();
  
  games.value = response.data.data.videojuegos;
};
onMounted(() => {
  getAllGames();
});
const openEditModal = (game) => {
  selectedGame.value = game;
  isEditModalOpen.value = true;
};
const closeEditModal = () => (isEditModalOpen.value = false);

const openDeleteModal = (gameId) => {
  selectedGameId.value = gameId;
  isDeleteModalOpen.value = true;
};
const closeDeleteModal = () => (isDeleteModalOpen.value = false);

const addGame = async (newGame) => {
  try {
    {
      const formData = new FormData();
      formData.append("title", newGame.title);
      formData.append("genre", newGame.genre);
      formData.append("description", newGame.description);
      formData.append("releaseDate", newGame.releaseDate);
      formData.append("subscription", newGame.subscription);
      formData.append("purchase", newGame.purchase);
      formData.append("price", newGame.price);
      newGame.image.forEach((file) => {
        formData.append("image", file);
      });
      await GameAPI.addGame(formData);
      getAllGames();
      closeAddModal();
    }
  } catch (error) {
    console.error("Error al enviar el juego:", error);
  }
};
// const editGame = (updatedGame) => {
//   console.log("Editar juego:", updatedGame);
//   closeEditModal();
// };
const editGame = async (updatedGame) => {
  console.log("test");
  try {
    if (updatedGame._id) {
      const formData = new FormData();
      formData.append("title", updatedGame.title);
      formData.append("genre", updatedGame.genre);
      formData.append("description", updatedGame.description);
      formData.append("releaseDate", updatedGame.releaseDate);
      formData.append("subscription", updatedGame.subscription);
      formData.append("purchase", updatedGame.purchase);
      formData.append("price", updatedGame.price);

      if (updatedGame.image && updatedGame.image.length > 0) {
        updatedGame.image.forEach((file) => {
          formData.append("image", file);
        });
      }

      await GameAPI.editGame({ id: updatedGame._id, data: formData });
      console.log("Editar juego:", updatedGame);
      getAllGames();
      closeEditModal();
    }
  } catch (error) {
    console.error("Error al editar el juego:", error);
  }
};
const subGame = async (game) => {
  const data = {
    videojuegoId: game._id,
    accessType: "subscription",
  };
  console.log("Sub", data);
  await LibraryAPI.addLibrary(data)
};
const buyGame = async (game) => {
  const data = {
    videojuegoId: game._id,
    accessType: "purchase",
  };
  console.log("Buy", data);
  
  await LibraryAPI.addLibrary(data)
};
const deleteGame = async (gameId) => {
  const id = gameId._id;
  await GameAPI.deleteGame(id);
  getAllGames();
  closeDeleteModal();
};
</script>
