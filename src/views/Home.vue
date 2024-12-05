<template>
  <ion-page :class="{ 'ion-palette-dark': isDark }">
    <gn-ion-content>
      <ion-toolbar :color="isDark ? 'medium' : 'light'">
        <ion-buttons slot="start">
          <ion-button @click="logout">
            <ion-icon class="topbar__icon" :icon="logOut"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button @click="toggleChange">
            <ion-icon
              :icon="isDark ? sunnyOutline : moon"
              class="topbar__icon"
            ></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title class="topbar__title">Galileo News</ion-title>
      </ion-toolbar>
      <div class="inicio-container">
        <div
          :class="` inicio-noticias ${
            tabActive === 'noticias' ? 'tab-visible' : ''
          }`"
        >
          <ion-card
            class="notice-card"
            v-for="(item, index) of noticiasEventos"
            :key="index"
          >
            <div class="notice-content">
              <div class="notice-content__topbar">
                <ion-icon class="topbar__icon" :icon="personCircle"></ion-icon>
                <span>{{ item.usuario }}</span>
                <ion-icon class="topbar__icon" :icon="book"></ion-icon>
                <span>{{ item.categoria }}</span>
                <div class="w-grow"></div>
                <span class="topbar__date">{{ item.fecha }}</span>
              </div>
              <div class="notice-content__detalle">
                <h3>{{ item.titulo }}</h3>
                <p>{{ item.descripcion }}</p>
              </div>
              <div class="notice-content__actions">
                <ion-button fill="clear">
                  <ion-icon
                    class="topbar__icon"
                    :icon="bookmarkOutline"
                  ></ion-icon>
                </ion-button>

                <div class="w-grow"></div>
              </div>
            </div>
            <div class="notice-image">
              <ion-img
                :src="item.image_url ?? 'https://i.ibb.co/FK86MYm/image.png'"
                alt="The Image"
              />
            </div>
          </ion-card>
          <ion-fab title="Agregar Noticia" @click="goCreateNoticia">
            <ion-fab-button>
              <ion-icon :icon="add"></ion-icon>
            </ion-fab-button>
          </ion-fab>
        </div>
        <div
          :class="` inicio-md-contactos ${
            tabActive === 'contactos' ? 'tab-visible' : ''
          }`"
        >
          <ion-card class="enlaces-card">
            <div class="card-header">
              <div class="card-header__title">Enlaces Importantes</div>
              <div class="card-header__actions">
                <ion-button fill="clear" color="danger">
                  <ion-icon class="topbar__icon" :icon="trashBin"></ion-icon>
                </ion-button>
                <ion-button fill="clear">
                  <ion-icon class="topbar__icon" :icon="brush"></ion-icon>
                </ion-button>
              </div>
            </div>
            <ion-list>
              <ion-item
                v-for="(item, index) of enlacesImportantes"
                :key="index"
              >
                <ion-label>
                  <h2>{{ item.titulo }}</h2>
                  <a :href="item.direccion_url">{{ item.direccion_url }}</a>
                </ion-label>
              </ion-item>
            </ion-list>
          </ion-card>
          <ion-card class="contactos-card">
            <div class="card-header">
              <div class="card-header__title">Contactos Importantes</div>
              <div class="card-header__actions">
                <ion-button fill="clear" color="danger">
                  <ion-icon class="topbar__icon" :icon="trashBin"></ion-icon>
                </ion-button>
                <ion-button fill="clear">
                  <ion-icon class="topbar__icon" :icon="brush"></ion-icon>
                </ion-button>
              </div>
            </div>
            <ion-list>
              <ion-item
                v-for="(item, index) of contactosImportantes"
                :key="index"
              >
                <ion-avatar aria-hidden="true" slot="start">
                  <img
                    alt=""
                    src="https://ionicframework.com/docs/img/demos/avatar.svg"
                  />
                </ion-avatar>
                <ion-label>
                  <h2>{{ item.nombre }}</h2>
                  <h3>{{ item.puesto }}</h3>
                  <p>{{ item.correo_electronico }}</p>
                  <p>{{ item.telefono }}</p>
                </ion-label>
              </ion-item>
            </ion-list>
          </ion-card>
        </div>
      </div>
    </gn-ion-content>
    <ion-footer>
      <div class="footer-buttons">
        <ion-button
          expand="block"
          fill="clear"
          size="large"
          :class="tabActive === 'noticias' ? 'tab-active' : ''"
          @click="
            () => {
              toggleTabActive('noticias');
            }
          "
        >
          <ion-icon :icon="newspaper"></ion-icon>
        </ion-button>
        <ion-button
          expand="block"
          fill="clear"
          size="large"
          :class="tabActive === 'contactos' ? 'tab-active' : ''"
          @click="
            () => {
              toggleTabActive('contactos');
            }
          "
        >
          <ion-icon :icon="idCard"></ion-icon>
        </ion-button>
      </div>
    </ion-footer>
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
  IonFab,
  IonFabButton,
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
  add,
} from "ionicons/icons";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

const isDark = computed(() => store.getters["darkLight/isDark"]);
const tabActive = ref("noticias");

const noticiasEventos = ref([
  {
    usuario: "TDS",
    categoria: "Invitación",
    fecha: "Sep 3, 2024",
    titulo: "How we Run Out of Fresh Music ?",
    descripcion:
      "Lorizzle i'm in the shizzle dolizzle sit fizzle, consectetuer adipiscing elit. Nullizzle shizzlin dizzle velizzle, yo volutpizzle, things quizzle, dope vizzle, arcu. Pellentesque owned the bizzle",
    image_url:
      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTrPn4eie6WFjf1rLs6gNnjakLIOZx6ccqAoTYoolPuqqxQMF8O",
  },
  {
    usuario: "GALILEO",
    categoria: "Novedades",
    fecha: "Sep 1, 2024",
    titulo: "How we Run Out of Fresh Music ?",
    descripcion:
      "Lorizzle i'm in the shizzle dolizzle sit fizzle, consectetuer adipiscing elit. Nullizzle shizzlin dizzle velizzle, yo volutpizzle, things quizzle, dope vizzle, arcu. Pellentesque owned the bizzle",
    image_url:
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTEzoR6P8aIBqfnzi77baejynOQklaZHYS360f2PemtXJdHO5lZ",
  },
  {
    usuario: "TDS",
    categoria: "Informativa",
    fecha: "Ago 31, 2024",
    titulo: "How we Run Out of Fresh Music ?",
    descripcion:
      "Lorizzle i'm in the shizzle dolizzle sit fizzle, consectetuer adipiscing elit. Nullizzle shizzlin dizzle velizzle, yo volutpizzle, things quizzle, dope vizzle, arcu. Pellentesque owned the bizzle",
    image_url:
      "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRrJTG8Sj7ZNysABLLXH0m_mB_lZRzF-V4Me01ISGVSlzpY6Zyo",
  },
  {
    usuario: "GALILEO",
    categoria: "Novedades",
    fecha: "Sep 1, 2024",
    titulo: "How we Run Out of Fresh Music ?",
    descripcion:
      "Lorizzle i'm in the shizzle dolizzle sit fizzle, consectetuer adipiscing elit. Nullizzle shizzlin dizzle velizzle, yo volutpizzle, things quizzle, dope vizzle, arcu. Pellentesque owned the bizzle",
    image_url:
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTEzoR6P8aIBqfnzi77baejynOQklaZHYS360f2PemtXJdHO5lZ",
  },
  {
    usuario: "TDS",
    categoria: "Informativa",
    fecha: "Ago 31, 2024",
    titulo: "How we Run Out of Fresh Music ?",
    descripcion:
      "Lorizzle i'm in the shizzle dolizzle sit fizzle, consectetuer adipiscing elit. Nullizzle shizzlin dizzle velizzle, yo volutpizzle, things quizzle, dope vizzle, arcu. Pellentesque owned the bizzle",
    image_url:
      "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRrJTG8Sj7ZNysABLLXH0m_mB_lZRzF-V4Me01ISGVSlzpY6Zyo",
  },
]);

const enlacesImportantes = ref([
  {
    titulo: "Pensum",
    direccion_url: "https://www.galileo.edu/ies/pensums/?gphcarrera=MSP",
  },
  {
    titulo: "Horario",
    direccion_url: "https://www.galileo.edu/ies/horarios/?gphcarrera=MSP",
  },
]);

const contactosImportantes = ref([
  {
    nombre: "Alex Jhonson",
    puesto: "Senior Product Designer, Innovatech Solutions",
    correo_electronico: "aliconnors@example.com",
    telefono: "(650) 6564-3492",
  },
  {
    nombre: "Jamie Smith",
    puesto: "UX Research Lead, UserFirst Insights",
    correo_electronico: "jamiesmith@example.com",
    telefono: "(502) 5635-1946",
  },
  {
    nombre: "Chris Brown",
    puesto: "Head of Product Management, TechPioneers",
    correo_electronico: "chrisbrown@example.com",
    telefono: "(503) 3894-7493",
  },
]);

const logout = async () => {
  router.push("login");
};

const goCreateNoticia = () => {
  router.push("create");
};

const toggleChange = () => {
  store.dispatch("darkLight/toggleDarkMode");
};

const toggleTabActive = (tabName) => {
  tabActive.value = tabName;
};
</script>

<style scoped>
gn-ion-content::part(background) {
  background: transparent;
}

.topbar__title {
  text-align: center;
  font-weight: bold;
  font-size: 24px;
}
</style>
