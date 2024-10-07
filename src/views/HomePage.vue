<template>
  <ion-page :class="{ 'ion-palette-dark': isDark }">
    <ion-content>
      <div class="topbar">
        <div class="topbar__title">
          <div>
            <ion-icon :icon="happyOutline" class="topbar__icon"></ion-icon>
          </div>
          <span>GalileoNews App</span>
          <div class="w-grow"></div>
          <ion-buttons>
            <ion-button color="dark" @click="toggleChange">
              <ion-icon :icon="isDark ? sunnyOutline : moon" class="topbar__icon"></ion-icon>
            </ion-button>
          </ion-buttons>
        </div>
      </div>
      <div class="login__background">
        <div id="register-login">
          <form id="login" name="login" class="margin-form" @submit.prevent="onSubmitForm">
            <div class="container-form">
              <div class="form-widget">
                <ion-input
                  v-model="formModel.email"
                  label-placement="stacked"
                  id="email"
                  type="text"
                  name="email"
                  label="Correo Electrónico"
                  placeholder="Ingresa tu correo" />
                <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
              </div>
              <div class="form-widget">
                <ion-input
                  v-model="formModel.password"
                  label-placement="stacked"
                  id="password"
                  type="password"
                  name="password"
                  label="Contraseña"
                  placeholder="Ingresa tu contraseña">
                  <ion-input-password-toggle></ion-input-password-toggle>
                </ion-input>
                <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
              </div>
              <div class="form-widget">
                <ion-checkbox v-model="formModel.rememberMe" id="rememberMe"></ion-checkbox>
                <label for="rememberMe">
                  Recordar mi contraseña en esta computadora
                </label>
              </div>
              <div class="form-element">
                <div class="form-actions">
                  <ion-button type="submit" expand="block">Entrar</ion-button>
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
              <span>Acceder con Google</span>
            </div>
          </div>
          <br />
          <div class="cont-standard">
            <span class="Faqs2">
              <a href="#" class="button">Soporte </a>
            </span>
            <span class="Faqs2">
              <a href="#" class="button">Olvido su contraseña? </a>
            </span>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonIcon, IonButton, IonButtons, IonInput, IonInputPasswordToggle, IonCheckbox } from '@ionic/vue';
import { happyOutline, sunnyOutline, moon, logoGoogle } from 'ionicons/icons';
import { ref, reactive, onMounted, onUnmounted } from 'vue';

const isDark = ref(false);
const formModel = reactive({
  email: '',
  password: '',
  rememberMe: false,
});

const errors = reactive({
  email: '',
  password: '',
});

const validateForm = () => {
  errors.email = formModel.email ? '' : 'El correo electrónico es obligatorio.';
  errors.password = formModel.password ? '' : 'La contraseña es obligatoria.';
  return !errors.email && !errors.password;
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

// Use matchMedia to check the user preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

const initializeDarkPalette = (_isDark) => {
  isDark.value = _isDark;
};

onMounted(() => {
  initializeDarkPalette(prefersDark.matches);
  prefersDark.addEventListener('change', (mediaQuery) => initializeDarkPalette(mediaQuery.matches));
});

onUnmounted(() => {
  prefersDark.removeEventListener('change', (mediaQuery) => initializeDarkPalette(mediaQuery.matches));
});

const toggleChange = () => {
  isDark.value = !isDark.value;
};
</script>

<style scoped>
ion-content::part(background) {
  background: transparent;
}

.error-message {
  color: red;
  font-size: 0.7em;
}

</style>