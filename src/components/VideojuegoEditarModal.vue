<template>
  <v-dialog v-model="internalDialog" max-width="500px">
    <v-card>
      <v-card-title class="headline">Editar Videojuego</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="editGame.title"
          label="Título"
          required
        ></v-text-field>
        <v-text-field
          v-model="editGame.genre"
          label="Género"
          required
        ></v-text-field>
        <v-textarea
          v-model="editGame.description"
          label="Descripción"
          required
        ></v-textarea>
        <v-text-field
          v-model="editGame.releaseDate"
          label="Fecha de Lanzamiento"
          type="date"
          required
        ></v-text-field>
        <v-checkbox
          v-model="editGame.accessType.subscription"
          label="Disponible por Suscripción"
        ></v-checkbox>
        <v-checkbox
          v-model="editGame.accessType.purchase"
          label="Disponible para Compra"
        ></v-checkbox>
        <v-text-field
          v-model="editGame.price"
          label="Precio"
          type="number"
          :disabled="!editGame.accessType.purchase"
        ></v-text-field>
        <v-file-input
          v-model="editGame.image"
          label="Actualizar Imágenes"
          accept="image/*"
          multiple
        ></v-file-input>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="editarVideojuego">Guardar Cambios</v-btn>
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
  game: {
    type: Object,
  },
});

const emit = defineEmits(["update:dialog", "edit"]);
const internalDialog = ref(props.dialog);
const editGame = ref({ ...props.game });

watch(
  () => props.dialog,
  (newVal) => {
    internalDialog.value = newVal;
  }
);

watch(internalDialog, (newVal) => {
  emit("update:dialog", newVal);
});

watch(
  () => props.game,
  (newVal) => {
    editGame.value = { ...newVal };
  }
);

const editarVideojuego = () => {
  emit("edit", editGame.value);
  cerrarModal();
};

const cerrarModal = () => {
  internalDialog.value = false;
};
</script>
