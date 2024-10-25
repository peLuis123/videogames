
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
        <h4 class="text-h4 mb-1">Adventure starts here 🚀</h4>
        <p class="mb-0">Make your app management easy and fun!</p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="createAccount">
          <VRow>
            <!-- username -->
            <VCol cols="12">
              <VTextField
                v-model="form.username"
                label="Username"
                placeholder="Johndoe"
              />
            </VCol>
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
              <!-- terms and condition checkbox -->
              <div
                class="d-flex align-center justify-space-between flex-wrap my-6"
              >
                <v-checkbox v-model="form.terms" class="align-start">
                  <template v-slot:label>
                    <div>
                      I agree that
                      <v-tooltip>
                        <template v-slot:activator="{ props }">
                          <a href="" target="_blank" v-bind="props" @click.stop>
                            privacy policy & terms
                          </a>
                        </template>
                        Opens in new window
                      </v-tooltip>
                    </div>
                  </template>
                </v-checkbox>
              </div>

              <!-- create Account button -->
              <VBtn block type="submit">Sing Up</VBtn>
            </VCol>

            <VCol cols="12" class="text-center text-base">
              <span>Already have an account?</span>
              <RouterLink class="text-primary ms-2" to="login">
                Sign in instead
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
  username: "",
  email: "",
  password: "",
  terms: false,
});

const vuetifyTheme = useTheme();
const router = useRouter();
const isPasswordVisible = ref(false);

const toggleTheme = () => {
  vuetifyTheme.global.name.value =
    vuetifyTheme.global.name.value === "light" ? "dark" : "light";
};
const createAccount = async () => {
  console.log("register");
};
</script>
