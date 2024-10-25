
<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard class="auth-card pa-4 pt-7" max-width="448">
      <VCardItem class="justify-center">
        <RouterLink to="/" class="d-flex align-center gap-3">
          <div class="d-flex" v-html="logo" />
          <h2 class="font-weight-medium text-2xl text-uppercase">plantilla</h2>
        </RouterLink>
      </VCardItem>

      <VCardText class="pt-2">
        <h4 class="text-h4 mb-1">Welcome to plantilla! 👋🏻</h4>
        <p class="mb-0">
          Please sign-in to your account and start the adventure
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="login">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField v-model="form.email" label="Email" type="email" />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                label="Password"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="
                  isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'
                "
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />
              <!-- remember me checkbox -->
              <div
                class="d-flex align-center justify-space-between flex-wrap my-6"
              >
                <VCheckbox v-model="form.remember" label="Remember me" />
                <a class="text-primary">Forgot Password?</a>
              </div>

              <!-- login button -->
              <VBtn block type="submit">Login</VBtn>
            </VCol>

            <VCol cols="12" class="text-center text-base">
              <span>New on our platform?</span>
              <RouterLink class="text-primary ms-2" to="/register">
                Create an account
              </RouterLink>
            </VCol>
            <VCol cols="12" class="d-flex align-center">
              <VDivider />
              <span class="mx-4">or</span>
              <VDivider />
            </VCol>

            <VCol cols="12" class="text-center">
              <AuthProvider />
            </VCol>
          </VRow>
        </VForm>
      </VCardText>

      <!-- Switch theme button -->
      <VCardActions>
        <VBtn
          icon="mdi-theme-light-dark"
          @click="toggleTheme"
          variant="text"
        ></VBtn>
      </VCardActions>
    </VCard>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useTheme } from "vuetify";
import AuthProvider from "@/components/AuthProvider.vue";
import logo from "@/assets/images/logo.svg?raw"; 
const form = ref({
  email: "",
  password: "",
  remember: false,
}); 
const vuetifyTheme = useTheme();
const router = useRouter();
const isPasswordVisible = ref(false);

const toggleTheme = () => {
  vuetifyTheme.global.name.value =
    vuetifyTheme.global.name.value === "light" ? "dark" : "light";
};

const login = async () => {
  console.log('logio')
};
</script>
