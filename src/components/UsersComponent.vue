<template>
  <v-container>
    <v-card>
      <v-card-title>Lista de Usuarios</v-card-title>
      <v-data-table
        :headers="headers"
        :items="users"
        class="elevation-1"
        :items-per-page="5"
      >
        <template v-slot:[`item.subscription.startDate`]="{ item }">
          {{ formatDate(item.subscription?.startDate) }}
        </template>
        <template v-slot:[`item.subscription.endDate`]="{ item }">
          {{ formatDate(item.subscription?.endDate) }}
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon
            class="me-2"
            size="small"
            v-if="!item.subscription?.isActive"
            color="green"
            @click="abrirCrearModal(item)"
          >
            mdi-plus-circle-outline
          </v-icon>
          <!-- <v-icon
            class="me-2"
            size="small"
            v-else
            color="blue"
            @click="abrirEditarModal(item)"
          >
            mdi-pencil
          </v-icon> -->
          <v-icon
            class="me-2"
            size="small"
            v-if="item.subscription?.isActive"
            color="red"
            @click="abrirEliminarModal(item)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>

    <CrearModal
      :key="crearModalKey"
      :dialog="mostrarCrearModal"
      :subscriptionTypes="subscriptionTypes"
      @close="cerrarModal('crear')"
      @create="confirmarCreacion"
    />
    <EditarModal
      :key="editarModalKey"
      :dialog="mostrarEditarModal"
      :subscriptionTypes="subscriptionTypes"
      :selectedSubscriptionType="selectedSubscriptionType"
      @close="cerrarModal('editar')"
      @edit="confirmarEdicion"
    />
    <EliminarModal
      :key="eliminarModalKey"
      :dialog="mostrarEliminarModal"
      @close="cerrarModal('eliminar')"
      @delete="confirmarEliminacion"
    />
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import CrearModal from "./userSubscriptionAddModal.vue";
import EditarModal from "./UserSubscriptionEditModal.vue";
import EliminarModal from "./UserSubscriptionDeleteModal.vue";
import { User as UserAPI } from "@/services/user";
import { Subs as SubsAPI } from "@/services/subs";

const users = ref([]);
const subscriptionTypes = ref([]);
const selectedUser = ref(null);
const selectedSubscriptionType = ref(null);
const mostrarCrearModal = ref(false);
const mostrarEditarModal = ref(false);
const mostrarEliminarModal = ref(false);

const crearModalKey = ref(0);
const editarModalKey = ref(0);
const eliminarModalKey = ref(0);

const headers = [
  { title: "Nombre", value: "name" },
  { title: "Correo", value: "email" },
  { title: "Rol", value: "rol" },
  { title: "Subscripción Activa", value: "subscription.isActive" },
  { title: "Tipo de Subscripción", value: "subscription.subscriptionType.name" },
  { title: "Inicio", value: "subscription.startDate" },
  { title: "Fin", value: "subscription.endDate" },
  { title: "Acciones", value: "actions", sortable: false },
];

const getAllUsers = async () => {
  try {
    const response = await UserAPI.getUsers();
    users.value = response.data.data.users;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
  }
};

const getAllSubs = async () => {
  try {
    const response = await SubsAPI.getSubs();
    subscriptionTypes.value = response.data.subs;
  } catch (error) {
    console.error("Error al obtener subscripciones:", error);
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const abrirCrearModal = (user) => {
  selectedUser.value = user;
  mostrarCrearModal.value = true;
  crearModalKey.value += 1;
};

const abrirEditarModal = (user) => {
  selectedUser.value = user;
  selectedSubscriptionType.value = user.subscription?.subscriptionType?.name;
  mostrarEditarModal.value = true;
  editarModalKey.value += 1;
};

const abrirEliminarModal = (user) => {
  selectedUser.value = user;
  mostrarEliminarModal.value = true;
  eliminarModalKey.value += 1;
};

const cerrarModal = (modal) => {
  if (modal === "crear") mostrarCrearModal.value = false;
  if (modal === "editar") mostrarEditarModal.value = false;
  if (modal === "eliminar") mostrarEliminarModal.value = false;
};
const confirmarCreacion = async (subscriptionTypeId) => {
  try {
    const data = {
      userId: selectedUser.value._id,
      subscriptionTypeId: subscriptionTypeId,
    };
    await SubsAPI.asignSub(data);
    getAllUsers();
    cerrarModal("crear");
  } catch (error) {}
};
const confirmarEdicion = (subscriptionTypeId) => {
  console.log("Editar:", selectedUser.value, subscriptionTypeId);
  cerrarModal("editar");
};
const confirmarEliminacion = async () => {
  try {
    const data = {
      userId: selectedUser.value._id,
    };
    await SubsAPI.deleteSub(data);
    getAllUsers();
    cerrarModal("eliminar");
  } catch (error) {}
};

onMounted(() => {
  getAllUsers();
  getAllSubs();
});
</script>

<style scoped>
.v-card-title {
  font-weight: bold;
  font-size: 1.2em;
  text-align: center;
}
</style>


