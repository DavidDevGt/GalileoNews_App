<template>
  <ion-page :class="{ 'ion-palette-dark': isDark }">
    <gn-ion-content>
      <div class="gn-topbar">
        <div class="gn-topbar__title">
          <div>
            <ion-icon :icon="happyOutline" class="gn-topbar__icon"></ion-icon>
          </div>
          <span id="title">GalileoNews</span>
          <div class="w-grow"></div>
          <ion-buttons>
            <ion-button
              :color="isDark ? 'light' : 'dark'"
              @click="toggleChange"
            >
              <ion-icon
                :icon="isDark ? sunnyOutline : moon"
                class="gn-topbar__icon"
              ></ion-icon>
            </ion-button>
          </ion-buttons>
        </div>
      </div>

      <div class="gn-register__background">
        <div id="register-login" class="gn-register__form-container">
          <div class="gn-register__title">
            <span>Galileo News</span>
          </div>
          <form id="register" name="register" @submit.prevent="onSubmitForm">
            <div class="container-form">
              <div
                class="form-widget"
                v-for="(field, index) in formFields"
                :key="index"
              >
                <ion-input
                  v-model="formModel[field.model]"
                  label-placement="stacked"
                  :id="field.model"
                  :type="field.type"
                  :name="field.model"
                  :label="field.label"
                  :placeholder="field.placeholder"
                />
                <span v-if="errors[field.model]" class="error-message">{{
                  errors[field.model]
                }}</span>
              </div>
              <div class="form-element">
                <div class="cont-standard">
                  <span class="Faqs2"></span>
                  <span class="Faqs2">
                    <a href="/login" @click.prevent="returnToLogin">
                      Ya tengo una cuenta
                    </a>
                  </span>
                </div>
                <div class="form-actions">
                  <ion-button type="submit" expand="block"
                    >Registrarse</ion-button
                  >
                </div>
              </div>
            </div>
          </form>

          <div class="sign-in-button">
            <div class="or">O</div>
            <div class="google_signin">
              <div class="google__icon">
                <ion-icon :icon="logoGoogle"></ion-icon>
              </div>
              <span @click="onGoogleSignIn">Registrar con Google</span>
            </div>
          </div>
        </div>
      </div>
    </gn-ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonIcon, IonButton, IonButtons, IonInput } from "@ionic/vue";
import { happyOutline, sunnyOutline, moon, logoGoogle } from "ionicons/icons";
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import authService from "@/services/authService";
import { alertController } from "@ionic/vue";

const router = useRouter();
const store = useStore();

const isDark = computed(() => store.getters["darkLight/isDark"]);

const formModel = reactive({
  username: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const errors = reactive({
  username: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const formFields = [
  {
    model: "username",
    label: "Nombre de Usuario",
    type: "text",
    placeholder: "Ingresa tu nombre de usuario",
  },
  {
    model: "email",
    label: "Correo Electrónico",
    type: "text",
    placeholder: "Ingresa tu correo",
  },
  {
    model: "password",
    label: "Contraseña",
    type: "password",
    placeholder: "Crea una contraseña",
  },
  {
    model: "confirmPassword",
    label: "Confirmar Contraseña",
    type: "password",
    placeholder: "Repite tu contraseña",
  },
];

const validateForm = () => {
  errors.username = formModel.username ? "" : "El nombre es obligatorio.";
  errors.email = formModel.email ? "" : "El correo electrónico es obligatorio.";
  errors.password = formModel.password ? "" : "La contraseña es obligatoria.";
  errors.confirmPassword =
    formModel.confirmPassword === formModel.password
      ? ""
      : "Las contraseñas no coinciden.";
  return (
    !errors.username &&
    !errors.email &&
    !errors.password &&
    !errors.confirmPassword
  );
};

const showSuccessAlert = async () => {
  const alert = await alertController.create({
    header: "Registro Exitoso",
    message: "Tu cuenta ha sido creada exitosamente.",
    buttons: ["OK"],
  });
  await alert.present();
};

const onSubmitForm = async () => {
  if (validateForm()) {
    try {
      const response = await authService.register(
        formModel.username,
        formModel.email,
        formModel.password
      );
      await showSuccessAlert();

      router.push("/login");
    } catch (error) {
      console.error("Error al registrar:", error);
    }
  } else {
    console.log("Validation failed");
  }
};

const onGoogleSignIn = () => {
  //window.location.href = `${process.env.VUE_APP_API_URL}/auth/google`;
  console.log('Google Sign In');
};

const returnToLogin = () => {
  router.push("/login");
};

const toggleChange = () => {
  store.dispatch('darkLight/toggleDarkMode');
};
</script>

<style scoped>
/* Fondo claro y oscuro */
gn-ion-content::part(background) {
  background: transparent;
}
</style>
