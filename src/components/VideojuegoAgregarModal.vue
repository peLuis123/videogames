<template>
  <v-dialog v-model="internalDialog" max-width="500px">
    <v-card>
      <v-card-title class="headline">Agregar Videojuego</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="newGame.title"
          label="Título"
          required
        ></v-text-field>
        <v-text-field
          v-model="newGame.genre"
          label="Género"
          required
        ></v-text-field>
        <v-textarea
          v-model="newGame.description"
          label="Descripción"
          required
        ></v-textarea>
        <v-text-field
          v-model="newGame.releaseDate"
          label="Fecha de Lanzamiento"
          type="date"
          required
        ></v-text-field>
        <v-checkbox
          v-model="newGame.subscription"
          label="Disponible por Suscripción"
        ></v-checkbox>
        <v-checkbox
          v-model="newGame.purchase"
          label="Disponible para Compra"
        ></v-checkbox>
        <v-text-field
          v-model="newGame.price"
          label="Precio"
          type="number"
          :disabled="!newGame.purchase"
        ></v-text-field>
        <v-file-input
          v-model="newGame.image"
          label="Imágenes del Videojuego"
          accept="image/*"
          multiple
          required
        ></v-file-input>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="agregarVideojuego">Agregar</v-btn>
        <v-btn color="secondary" @click="cerrarModal">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  dialog: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:dialog", "add"]);
const internalDialog = ref(props.dialog);

watch(
  () => props.dialog,
  (newVal) => {
    internalDialog.value = newVal;
  }
);

watch(internalDialog, (newVal) => {
  emit("update:dialog", newVal);
});

const newGame = ref({
  title: "",
  genre: "",
  description: "",
  releaseDate: "",
  subscription: false,
  purchase: false,
  price: 0,
  image: [],
});

const agregarVideojuego = () => {
  console.log(newGame.value);
  emit("add", newGame.value);
  cerrarModal();
};

const cerrarModal = () => {
  internalDialog.value = false;
};
</script>
