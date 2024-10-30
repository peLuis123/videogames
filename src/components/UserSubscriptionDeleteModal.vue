<template>
  <v-dialog v-model="internalDialog" max-width="400px">
    <v-card>
      <v-card-title class="headline">Eliminar Suscripción</v-card-title>
      <v-card-text
        >¿Estás seguro de que deseas eliminar esta suscripción?</v-card-text
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" @click="confirmarEliminacion">Eliminar</v-btn>
        <v-btn color="secondary" @click="cerrarModal">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps(["dialog"]);
const emit = defineEmits(["close", "delete"]);
const internalDialog = ref(props.dialog);

const confirmarEliminacion = () => {
  emit("delete");
};

const cerrarModal = () => {
  emit("close");
};
</script>
