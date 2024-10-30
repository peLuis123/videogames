<template>
  <v-dialog v-model="internalDialog" max-width="400px">
    <v-card>
      <v-card-title class="headline">{{ gameId.title }}</v-card-title>
      <v-card-text
        >¿Estás seguro de que deseas eliminar este videojuego?</v-card-text
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-2" @click="confirmarEliminacion"
          >Eliminar</v-btn
        >
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
  gameId: {
    type: Object,
  },
});
const emit = defineEmits(["update:dialog", "delete"]);
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

const confirmarEliminacion = () => {
  emit("delete", props.gameId);
  cerrarModal();
};

const cerrarModal = () => {
  internalDialog.value = false;
};
</script>
