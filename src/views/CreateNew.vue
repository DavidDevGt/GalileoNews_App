<template>
  <ion-page :class="{ 'ion-palette-dark': isDark }">
    <ion-content>
      <ion-toolbar :color="isDark ? 'medium' : 'light'">

        <ion-buttons slot="start">
          <ion-button @click="toggleExit">
            <ion-icon class="topbar__icon" :icon="logOut"></ion-icon>
          </ion-button>

          <ion-button @click="goHome">
            <ion-icon class="topbar__icon" :icon="homeOutline"></ion-icon>
          </ion-button>

        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button @click="toggleChange">
            <ion-icon :icon="isDark ? sunnyOutline : moon" class="topbar__icon"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title class="topbar__title">Galileo News</ion-title>
      </ion-toolbar>

      <!-- Formulario de creación de noticias -->
      <form id="create-news" name="create-news" class="create-news-form" @submit.prevent="onSubmitForm">
        <div class="form-group" v-for="(field, index) in formFields" :key="index">
          <!-- Manejo de input -->
          <ion-input :value="formModel[field.model]" @ionChange="(e) => formModel[field.model] = e.detail.value"
            label-placement="stacked" :id="index" :type="field.type" :name="field.model" :label="field.label"
            :placeholder="field.placeholder" />

          <span v-if="errors[field.model]" class="error-message">{{
            errors[field.model]
          }}</span>
        </div>
        <ion-input type="file" @change="handleFileChange" placeholder="Seleccione una imagen" />
        <span v-if="errors.fileImage" class="error-message">{{ errors.fileImage }}</span>

        <!-- Botón de publicar -->
        <div class="form-actions">
          <ion-button type="submit" expand="block" class="publish-button">Publicar</ion-button>
        </div>
      </form>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonIcon,
  IonButton,
  IonButtons,
} from "@ionic/vue";
import {
  sunnyOutline,
  moon,
  logOut,
  homeOutline,
} from "ionicons/icons";
import { computed, reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

const isDark = computed(() => store.getters["darkLight/isDark"]);



const formModel = reactive({
  nameNews: "",
  description: "",
  career: "",
  type: "",
  date: "",
  fileImage: "",
});

const errors = reactive({
  nameNews: "",
  description: "",
  career: "",
  type: "",
  date: "",
  fileImage: "",
});

const formFields = [
  {
    model: "nameNews",
    label: "Noticia",
    type: "text",
    placeholder: "Ingresa el Titular",
  },
  {
    model: "description",
    label: "Descripcion",
    type: "textarea",
    placeholder: "Ingresa el cuerpo de la noticia",
  },
  {
    model: "career",
    label: "Carrera",
    type: "text",
    placeholder: "Ingresa la carrera",
  },
  {
    model: "type",
    label: "Tipo de Noticia",
    type: "text",
    placeholder: "Ingrese el tipo de noticia",
  },
  {
    model: "date",
    label: "Ingrese la fecha de evento",
    type: "date",
    placeholder: "Ingrese una fecha",
  }
];



const handleFileChange = (event) => {
  formModel.fileImage = event.target.files[0]; // Almacena el archivo seleccionado
};

const validateForm = () => {
  errors.nameNews = formModel.nameNews.trim() ? "" : "El Titular es obligatorio.";
  errors.description = formModel.description.trim() ? "" : "La descripción es obligatoria.";
  errors.career = formModel.career.trim() ? "" : "El campo carrera es obligatorio.";
  errors.type = formModel.type.trim() ? "" : "El tipo de noticia es obligatorio.";
  errors.date = formModel.date.trim() ? "" : "El campo fecha es obligatorio.";
  errors.fileImage = formModel.fileImage ? "" : "La imagen es obligatoria"
  return (
    !errors.nameNews &&
    !errors.description &&
    !errors.career &&
    !errors.type &&
    !errors.date &&
    !errors.fileImage
  );
};


const onSubmitForm = () => {
  if (validateForm()) {
    console.log("formModel", JSON.stringify(formModel));
  } else {
    console.log("Validation failed");
  }
};

const toggleChange = () => {
  store.dispatch("darkLight/toggleDarkMode");
};

const toggleExit = () => {
  router.push('/login')
}

const goHome = () => {
  router.push('/home')
}
</script>

<style scoped>
.topbar__icon {
  font-size: 1.5rem;
}

.error-message {
  color: var(--ion-color-danger);
  font-size: 0.8rem;
  margin-top: 0.3rem;
}

.create-news-form {
  margin: 2rem;
}

@media screen and (max-width: 768px) {
  .create-news-form {
    margin: 1.2rem;
  }
}

.form-group {
  width: 94%;
  margin-bottom: 1rem;
}

.form-actions {
  margin-top: 2rem;
}

.publish-button {
  margin: 0 auto;
  max-width: 300px;
}

/* Estilo para los placeholders de los inputs */
ion-input::part(native)::placeholder {
  color: #c1c1c1; /* Placeholder amigable */
  font-size: 0.9em;
  font-style: italic;
}
</style>