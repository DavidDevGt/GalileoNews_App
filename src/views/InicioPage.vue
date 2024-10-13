<template>
  <ion-page :class="{ 'ion-palette-dark': isDark }">
    <ion-content>
      <ion-toolbar :color="isDark ? 'medium' : 'light'" >
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
        <ion-title class="topbar__title" >Galileo News</ion-title>
      </ion-toolbar>
      <div class="inicio-container" >
        <div class="inicio-noticias" >
          <ion-card class="notice-card" v-for="(item, index) of noticiasEventos" :key="index">
            <div class="notice-content" >
              <div class="notice-content__topbar" >
                <ion-icon class="topbar__icon" :icon="personCircle"></ion-icon>
                <span>{{ item.usuario }}</span>
                <ion-icon class="topbar__icon" :icon="book"></ion-icon>
                <span>{{ item.categoria }}</span>
                <div class="w-grow"></div>
                <span class="topbar__date" >{{ item.fecha }}</span>
              </div>
              <div class="notice-content__detalle" >
                <h3>{{ item.title }}</h3>
                <p>{{ item.description }}</p>
              </div>
              <div class="notice-content__actions" >
                <ion-button fill="outline">
                  <ion-icon class="topbar__icon" :icon="bookmarkOutline"></ion-icon>
                </ion-button>
                <div class="w-grow"></div>
                <ion-button fill="outline">
                  <ion-icon class="topbar__icon" :icon="trashBin"></ion-icon>
                </ion-button>
                <ion-button fill="outline">
                  <ion-icon class="topbar__icon" :icon="pencil"></ion-icon>
                </ion-button>
              </div>
            </div>
            <div class="notice-image" >
              <ion-img
                :src="item.image_url ?? 'https://i.ibb.co/FK86MYm/image.png'"
                alt="The Image"
              />
            </div>
          </ion-card>
        </div>
        <div class="inicio-md-contactos" >
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonIcon, IonButton, IonButtons, IonCard, IonImg } from '@ionic/vue';
import { sunnyOutline, moon, logOut, personCircle, book, bookmarkOutline, pencil, trashBin } from 'ionicons/icons';
import { ref, onMounted, onUnmounted } from 'vue';

const isDark = ref(false);

const noticiasEventos = ref([
  {
    usuario: 'TDS',
    categoria: 'Invitación',
    fecha: 'Sep 3, 2024',
    title: 'How we Run Out of Fresh Music ?',
    description: 'Lorizzle i\'m in the shizzle dolizzle sit fizzle, consectetuer adipiscing elit. Nullizzle shizzlin dizzle velizzle, yo volutpizzle, things quizzle, dope vizzle, arcu. Pellentesque owned the bizzle',
    image_url: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTrPn4eie6WFjf1rLs6gNnjakLIOZx6ccqAoTYoolPuqqxQMF8O'
  },
  {
    usuario: 'GALILEO',
    categoria: 'Novedades',
    fecha: 'Sep 1, 2024',
    title: 'How we Run Out of Fresh Music ?',
    description: 'Lorizzle i\'m in the shizzle dolizzle sit fizzle, consectetuer adipiscing elit. Nullizzle shizzlin dizzle velizzle, yo volutpizzle, things quizzle, dope vizzle, arcu. Pellentesque owned the bizzle',
    image_url: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTEzoR6P8aIBqfnzi77baejynOQklaZHYS360f2PemtXJdHO5lZ'
  },
  {
    usuario: 'TDS',
    categoria: 'Informativa',
    fecha: 'Ago 31, 2024',
    title: 'How we Run Out of Fresh Music ?',
    description: 'Lorizzle i\'m in the shizzle dolizzle sit fizzle, consectetuer adipiscing elit. Nullizzle shizzlin dizzle velizzle, yo volutpizzle, things quizzle, dope vizzle, arcu. Pellentesque owned the bizzle',
    image_url: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRrJTG8Sj7ZNysABLLXH0m_mB_lZRzF-V4Me01ISGVSlzpY6Zyo'
  }
]);

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

.topbar__title  {
  text-align: center;
  font-weight: bold;
  font-size: 24px;
}
</style>