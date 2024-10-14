<template>
  <ion-page :class="{ 'ion-palette-dark': isDark }">
    <ion-content>
      <div class="topbar">
        <div class="topbar__title">
          <div>
            <ion-icon :icon="happyOutline" class="topbar__icon"></ion-icon>
          </div>
          <span :class="{'dark-text': isDark, 'light-text': !isDark}">GalileoNews - Registro</span>
          <div class="w-grow"></div>
          <ion-buttons>
            <ion-button :color="isDark ? 'light' : 'dark'" @click="toggleChange">
              <ion-icon :icon="isDark ? sunnyOutline : moon" class="topbar__icon"></ion-icon>
            </ion-button>
          </ion-buttons>
        </div>
      </div>
      <div class="register__background">
        <div id="register-form" class="centered-box" :class="{ 'dark-box': isDark }">
          <form id="register" name="register" class="margin-form" @submit.prevent="onSubmitForm">
            <div class="container-form">
              <!-- Campos de registro -->
              <div class="form-widget" v-for="(field, index) in formFields" :key="index">
                <ion-input
                  v-model="formModel[field.model]"
                  label-placement="stacked"
                  :id="field.model"
                  :type="field.type"
                  :name="field.model"
                  :label="field.label"
                  :placeholder="field.placeholder"
                  :class="{ 'dark-text': isDark }"
                />
                <span v-if="errors[field.model]" class="error-message">{{ errors[field.model] }}</span>
              </div>
              <div class="form-element">
                <div class="form-actions">
                  <ion-button type="submit" expand="block" class="register-button">Registrarse</ion-button>
                </div>
              </div>
            </div>
          </form>
          <div class="sign-in-button">
            <div class="or">O</div>
            <div class="google_signin" @click="onGoogleSignIn">
              <div class="google__icon">
                <ion-icon :icon="logoGoogle"></ion-icon>
              </div>
              <span>Registrar con Google</span>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonIcon, IonButton, IonButtons, IonInput } from '@ionic/vue';
import { happyOutline, sunnyOutline, moon, logoGoogle } from 'ionicons/icons';
import { ref, reactive } from 'vue';

const isDark = ref(false);

const formModel = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const errors = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const formFields = [
  { model: 'firstName', label: 'Nombre', type: 'text', placeholder: 'Ingresa tu nombre' },
  { model: 'lastName', label: 'Apellido', type: 'text', placeholder: 'Ingresa tu apellido' },
  { model: 'email', label: 'Correo Electrónico', type: 'text', placeholder: 'Ingresa tu correo' },
  { model: 'password', label: 'Contraseña', type: 'password', placeholder: 'Crea una contraseña' },
  { model: 'confirmPassword', label: 'Confirmar Contraseña', type: 'password', placeholder: 'Repite tu contraseña' }
];

const validateForm = () => {
  errors.firstName = formModel.firstName ? '' : 'El nombre es obligatorio.';
  errors.lastName = formModel.lastName ? '' : 'El apellido es obligatorio.';
  errors.email = formModel.email ? '' : 'El correo electrónico es obligatorio.';
  errors.password = formModel.password ? '' : 'La contraseña es obligatoria.';
  errors.confirmPassword = formModel.confirmPassword === formModel.password ? '' : 'Las contraseñas no coinciden.';
  return !errors.firstName && !errors.lastName && !errors.email && !errors.password && !errors.confirmPassword;
};

const onSubmitForm = () => {
  if (validateForm()) {
    console.log('formModel', JSON.stringify(formModel));
  } else {
    console.log('Validation failed');
  }
};

const onGoogleSignIn = () => {
  console.log('Google Sign-In clicked');
};

const toggleChange = () => {
  isDark.value = !isDark.value;
};
</script>

<style scoped>
/* Fondo claro y oscuro */
ion-content::part(background) {
  background-color: var(--ion-background-color, white);
}

.ion-palette-dark ion-content::part(background) {
  background-color: #1e1e1e;
}

/* Estilos para el cuadro en modo oscuro */
.dark-box {
  background-color: black;
}

/* Estilos para el texto */
.dark-text {
  color: white;
}

.light-text {
  color: black;
}

.error-message {
  color: red;
  font-size: 0.7em;
}

/* Estilos de cuadro centrado */
.centered-box {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

/* Botón de modo oscuro/luz */
.topbar__icon {
  font-size: 1.5em;
}

ion-button {
  --background: var(--ion-color-dark);
}

.ion-palette-dark ion-button {
  --background: var(--ion-color-light);
}

.sign-in-button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.google_signin {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.google__icon {
  margin-right: 10px;
}

.or {
  text-align: center;
  margin: 20px 0;
}

/* Botón de registro en verde */
.register-button {
  --background: green;
}

/* Botón de modo oscuro en blanco, modo claro en negro */
ion-button[aria-label="Change Theme"] {
  --background: black;
}

.ion-palette-dark ion-button[aria-label="Change Theme"] {
  --background: rgb(0, 0, 0);
  --color: black;
}
</style>