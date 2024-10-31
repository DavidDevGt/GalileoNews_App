<template>
  <ion-page :class="{ 'ion-palette-dark': isDark }">
    <ion-content>
      <ion-toolbar :color="isDark ? 'medium' : 'light'">
        <ion-buttons slot="start">
          <ion-button @click="goHome">
            <ion-icon class="topbar__icon" :icon="homeOutline"></ion-icon>
          </ion-button>
          <ion-button @click="toggleExit">
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

      <!-- Formulario de creación de noticias -->
      <form id="create-news" name="create-news" class="create-news-form" @submit.prevent="onSubmitForm">
        <div class="form-group" v-for="(field, index) in formFields" :key="index">
          <ion-input v-model="formModel[field.model]" label-placement="stacked" 
          :id="field.model" 
          :type="field.type"
          :name="field.model" :label="field.label" 
          :placeholder="field.placeholder" />
          <span v-if="errors[field.model]" class="error-message">{{
            errors[field.model]
          }}</span>
        </div>

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
  IonCard,
  IonImg,
} from "@ionic/vue";
import {
  sunnyOutline,
  moon,
  logOut,
  personCircle,
  book,
  bookmarkOutline,
  trashBin,
  newspaper,
  idCard,
  brush,
  homeOutline,
} from "ionicons/icons";
import { ref, computed, reactive } from "vue";
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
  image: ""
});

const errors = reactive({
  nameNews: "",
  description: "",
  career: "",
  type: "",
  date: "",
  fileImage:""
});

const formFields = [
  {
    model: "nameNews",
    label: "Noticia",
    type: "text",
    placeholder: "Ingresa el Titular",
  },
  {
    model: "descriptrionNews",
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
  },
  {
    model: "fileImage",
    label: "Seleccione una imagen",
    type: "file",
    placeholder: "Ingrese una imagen",
  }
];

const validateForm = () => {
  errors.nameNews = formModel.nameNews ? "" : "El Titular es obligatorio.";
  errors.descriptrionNews = formModel.lastName ? "" : "La descripcion es obligatoria";
  errors.career = formModel.career ? "" : "La campo carrera es obligatorio";
  errors.type = formModel.type ? "" : "El tipo de noticia es obligatorio";
  errors.date = formModel.date ? "" : "El campo fecha es obligatorio";
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
  margin-bottom: 1rem;
}

.form-actions {
  margin-top: 2rem;
}

.publish-button {
  margin: 0 auto;
  max-width: 300px;
}
</style>