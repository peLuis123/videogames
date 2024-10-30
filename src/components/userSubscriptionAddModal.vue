<template>
  <v-dialog v-model="internalDialog" max-width="500px">
    <v-card>
     
      <v-card-title class="headline">Crear Suscripción</v-card-title>
      <v-card-text>
        <v-select
          v-model="selectedSubscription"
          :items="subscriptionTypes"
          item-title="name"
          item-value="name"
          label="Tipo de Suscripción"
          required
        ></v-select>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="confirmarCreacion">Crear</v-btn>
        <v-btn color="secondary" @click="cerrarModal">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps(["dialog", "subscriptionTypes"]);
const emit = defineEmits(["close", "create"]);
const internalDialog = ref(props.dialog);
const selectedSubscription = ref(null);

watch(
  () => props.dialog,
  (newVal) => {
    internalDialog.value = newVal;
  }
);

const confirmarCreacion = () => {
  emit("create", selectedSubscription.value);
};

const cerrarModal = () => {
  emit("close");
};
</script>
