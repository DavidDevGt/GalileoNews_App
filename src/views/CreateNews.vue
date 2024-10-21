<template>
  <ion-page :class="{ 'ion-palette-dark': isDark }">
    <ion-content>
      <ion-toolbar :color="isDark ? 'medium' : 'light'">
        <ion-buttons slot="start">
          <ion-button>
            <ion-icon class="topbar__icon" :icon="logOut"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button @click="toggleChange">
            <ion-icon :icon="isDark ? sunnyOutline : moon" class="topbar__icon"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title class="topbar__title">Galileo News</ion-title>
      </ion-toolbar>
      <!-- Create Form -->
      <form id="register" name="register" class="margin-form" @submit.prevent="onSubmitForm">
        <div class="container-form">
          <!-- Campos de registro -->
          <div class="form-widget" v-for="(field, index) in formFields" :key="index">
            <ion-input v-model="formModel[field.model]" 
                      label-placement="stacked" 
                      :id="field.model" 
                      :type="field.type"
                      :name="field.model" 
                      :label="field.label" 
                      :placeholder="field.placeholder"
                      :class="{ 'dark-text': isDark }" />
            <span v-if="errors[field.model]" class="error-message">{{ errors[field.model] }}</span>
          </div>
          <div class="form-element">
            <div class="form-actions">
              <ion-button type="submit" expand="block" class="register-button">Publicar</ion-button>
            </div>
          </div>
        </div>
      </form>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonIcon, IonButton, IonButtons, IonCard, IonImg } from '@ionic/vue';
import { sunnyOutline, moon, logOut, personCircle, book, bookmarkOutline, trashBin, newspaper, idCard, brush } from 'ionicons/icons';
import { ref, onMounted, onUnmounted, reactive } from 'vue';

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
  { model: 'nameNews', label: 'Noticia', type: 'text', placeholder: 'Ingresa el Titular' },
  { model: 'descriptrionNews', label: 'Descripcion', type: 'textarea', placeholder: 'Ingresa el cuerpo de la noticia' },
  { model: 'career', label: 'Carrera', type: 'text', placeholder: 'Ingresa la carrera' },
  { model: 'type', label: 'Tipo de Noticia', type: 'text', placeholder: 'Ingrese el tipo de noticia' },
  { model: 'date', label: 'Ingrese la fecha de evento', type: 'date', placeholder: 'Ingrese una fecha' },
  { model: 'confirmPassword', label: 'Confirmar Contraseña', type: 'password', placeholder: 'Repite tu contraseña' }
];

const validateForm = () => {
  errors.nameNews = formModel.nameNews ? '' : 'El Titular es obligatorio.';
  errors.descriptrionNews = formModel.lastName ? '' : 'La descripcion es obligatoria';
  errors.career = formModel.career ? '' : 'La campo carrera es obligatorio';
  errors.type = formModel.type ? '' : 'El tipo de noticia es obligatorio';
  errors.date = formModel.date ? '' : 'El campo fecha es obligatorio';
  return !errors.firstName && !errors.lastName && !errors.email && !errors.password && !errors.confirmPassword;
};

const onSubmitForm = () => {
  if (validateForm()) {
    console.log('formModel', JSON.stringify(formModel));
  } else {
    console.log('Validation failed');
  }
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

.topbar__title {
  text-align: center;
  font-weight: bold;
  font-size: 24px;
}

.ion-palette-dark ion-content::part(background) {
  background-color: #1e1e1e;
}

/* Estilos para el cuadro en modo oscuro */
.dark-box {
  background-color: #121212;
  color: #f5f5f5;
}

/* Estilos para el texto */
.dark-text {
  color: white;
}

.light-text {
  color: black;
}

.error-message {
  color: #ff8800;
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

ion-button[aria-label="Change Theme"] {
  --background: var(--ion-color-light);
  --color: var(--ion-color-dark);
}

.ion-palette-dark ion-button[aria-label="Change Theme"] {
  --background: var(--ion-color-dark);
  --color: var(--ion-color-light);
}





/* Botón de registro en verde */
.register-button {
  --background: #b89a59;
}

/* Botón de modo oscuro en blanco, modo claro en negro */
ion-button[aria-label="Change Theme"] {
  --background: #b89a59;
}

.ion-palette-dark ion-button[aria-label="Change Theme"] {
  --background: #b89a59;
  --color: rgb(255, 255, 255);
}

.centered-box,
.dark-text,
.light-text {
  transition: background-color 0.3s ease, color 0.3s ease;
}

.theme-toggle-button {
  --background: var(--ion-color-light);
  --color: var(--ion-color-dark);
}

.ion-palette-dark .theme-toggle-button {
  --background: var(--ion-color-dark);
  --color: var(--ion-color-light);
}
</style>