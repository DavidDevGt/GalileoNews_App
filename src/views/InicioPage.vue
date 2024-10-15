<template>
  <ion-page :class="{ 'ion-palette-dark': isDark }">
    <ion-content>
      <ion-toolbar :color="isDark ? 'medium' : 'light'">
        <ion-buttons slot="start">
          <ion-button>
            <ion-icon class="topbar__icon" :icon="logOut" />
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button @click="toggleChange">
            <ion-icon :icon="isDark ? sunnyOutline : moon" class="topbar__icon" />
          </ion-button>
        </ion-buttons>
        <ion-title class="topbar__title">Galileo News</ion-title>
      </ion-toolbar>
      
      <div class="inicio-container">
        <div class="inicio-noticias">
          <ion-card class="notice-card" v-for="(item, index) of noticiasEventos" :key="index">
            <div class="notice-content">
              <div class="notice-content__topbar">
                <ion-icon class="topbar__icon" :icon="personCircle" />
                <span>{{ item.usuario }}</span>
                <ion-icon class="topbar__icon" :icon="book" />
                <span>{{ item.categoria }}</span>
                <div class="w-grow"></div>
                <span class="topbar__date">{{ item.fecha }}</span>
              </div>
              <div class="notice-content__detalle">
                <h3>{{ item.title }}</h3>
                <p>{{ item.description }}</p>
              </div>
              <div class="notice-content__actions">
                <ion-button fill="outline">
                  <ion-icon class="topbar__icon" :icon="bookmarkOutline" />
                </ion-button>
                <div class="w-grow"></div>
                <ion-button fill="outline">
                  <ion-icon class="topbar__icon" :icon="trashBin" />
                </ion-button>
                <ion-button fill="outline">
                  <ion-icon class="topbar__icon" :icon="pencil" />
                </ion-button>
              </div>
            </div>
            <div class="notice-image">
              <ion-img
                :src="item.image_url ?? 'https://i.ibb.co/FK86MYm/image.png'"
                alt="News Image"
              />
            </div>
          </ion-card>
        </div>
        <!-- Important links and contacts section (right side) -->
        <div class="inicio-info">
  <ion-card class="important-links">
    <ion-card-header>
      <ion-card-title>Enlaces Importantes</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <ul>
        <li v-for="(link, index) in enlacesImportantes" :key="index">
          <ion-icon :icon="link.icon" class="link-icon" />
          <a :href="link.url">{{ link.text }}</a>
        </li>
        <li>
          <ion-icon :icon="link" class="link-icon" />
          <a href="https://example.com/faq">Preguntas Frecuentes</a>
        </li>
        <li>
          <ion-icon :icon="link" class="link-icon" />
          <a href="https://example.com/ayuda">Centro de Ayuda</a>
        </li>
      </ul>
    </ion-card-content>
  </ion-card>

  <ion-card class="important-contacts">
    <ion-card-header>
      <ion-card-title>Contactos Importantes</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <ul>
        <li v-for="(contact, index) in contactosImportantes" :key="index">
          <ion-icon :icon="contact.icon" class="contact-icon" />
          <span>{{ contact.nombre }} - {{ contact.rol }}</span>
        </li>
        <li>
          <ion-icon :icon="person" class="contact-icon" />
          <span>Soporte - 800-123-4567</span>
        </li>
        <li>
          <ion-icon :icon="call" class="contact-icon" />
          <span>Ventas - 800-987-6543</span>
        </li>
      </ul>
    </ion-card-content>
  </ion-card>
</div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent, IonToolbar, IonButtons, IonButton, IonIcon, IonTitle, IonCard, IonImg } from '@ionic/vue';
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
  background: var(--ion-background-color);
}

.topbar__title {
  text-align: center;
  font-weight: bold;
  font-size: 24px;
}

.inicio-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 16px;
}

.inicio-noticias {
  width: 100%; /* Adjusted to 100% as there's no sidebar in this version */
}

.notice-card {
  display: flex;
  margin-bottom: 16px;
}

.notice-content {
  flex: 1;
  padding: 16px;
}

.notice-image {
  width: 30%;
  min-width: 100px;
}

.notice-content__topbar,
.notice-content__actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.w-grow {
  flex-grow: 1;
}

.topbar__icon {
  font-size: 20px;
}

.notice-content__detalle h3 {
  margin-top: 8px;
  margin-bottom: 4px;
}

.notice-content__detalle p {
  margin-top: 0;
}

.notice-content__actions ion-button {
  --padding-start: 8px;
  --padding-end: 8px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .notice-card {
    flex-direction: column;
  }

  .notice-image {
    width: 100%;
    height: 200px;
    order: -1;
  }

  .notice-image ion-img {
    height: 100%;
    object-fit: cover;
  }
}
/* Cambiar el fondo general del contenido a gris oscuro en modo oscuro */
.ion-palette-dark ion-content::part(background) {
  --ion-background-color: #2b2b2b; /* Gris oscuro */
}

/* Cambiar el color de fondo de los cuadros (noticias, enlaces, contactos) a negro en modo oscuro */
.ion-palette-dark .notice-card, 
.ion-palette-dark .important-links, 
.ion-palette-dark .important-contacts {
  background-color: #000; /* Negro */
  color: white; /* Texto blanco */
}

/* Cambiar el color de las letras a blanco en modo oscuro */
.ion-palette-dark .notice-content__topbar span,
.ion-palette-dark .notice-content__detalle h3,
.ion-palette-dark .notice-content__detalle p,
.ion-palette-dark .topbar__date,
.ion-palette-dark a,
.ion-palette-dark ion-card-title {
  color: white;
}

/* Cambiar el color de los íconos a blanco en modo oscuro */
.ion-palette-dark .topbar__icon,
.ion-palette-dark .link-icon,
.ion-palette-dark .contact-icon {
  color: white;
}
</style>