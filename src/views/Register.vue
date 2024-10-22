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
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const isDark = ref(false);

const formModel = reactive({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const errors = reactive({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const formFields = [
  {
    model: "firstName",
    label: "Nombre",
    type: "text",
    placeholder: "Ingresa tu nombre",
  },
  {
    model: "lastName",
    label: "Apellido",
    type: "text",
    placeholder: "Ingresa tu apellido",
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
  errors.firstName = formModel.firstName ? "" : "El nombre es obligatorio.";
  errors.lastName = formModel.lastName ? "" : "El apellido es obligatorio.";
  errors.email = formModel.email ? "" : "El correo electrónico es obligatorio.";
  errors.password = formModel.password ? "" : "La contraseña es obligatoria.";
  errors.confirmPassword =
    formModel.confirmPassword === formModel.password
      ? ""
      : "Las contraseñas no coinciden.";
  return (
    !errors.firstName &&
    !errors.lastName &&
    !errors.email &&
    !errors.password &&
    !errors.confirmPassword
  );
};

const onSubmitForm = () => {
  if (validateForm()) {
    console.log("formModel", JSON.stringify(formModel));
  } else {
    console.log("Validation failed");
  }
};

const onGoogleSignIn = () => {
  console.log("Google Sign-In clicked");
};

const returnToLogin = () => {
  router.push("/login");
};

const toggleChange = () => {
  isDark.value = !isDark.value;
};
</script>

<style scoped>
/* Fondo claro y oscuro */
gn-ion-content::part(background) {
  background: transparent;
}
</style>
