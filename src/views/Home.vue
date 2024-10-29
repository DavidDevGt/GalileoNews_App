<template>
  <ion-page :class="{ 'ion-palette-dark': isDark }">
    <gn-ion-content>
      <ion-toolbar :color="isDark ? 'medium' : 'light'" >
        <ion-buttons slot="start">
          <ion-button @click="logout">
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
        <div :class="` inicio-noticias ${tabActive === 'noticias' ? 'tab-visible' : ''}`" >
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
                <h3>{{ item.titulo }}</h3>
                <p>{{ item.descripcion }}</p>
              </div>
              <div class="notice-content__actions" >
                <ion-button fill="clear">
                  <ion-icon class="topbar__icon" :icon="bookmarkOutline"></ion-icon>
                </ion-button>
           
                <div class="w-grow"></div>
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
        <div :class="` inicio-md-contactos ${tabActive === 'contactos' ? 'tab-visible' : ''}`" >
          <ion-card class="enlaces-card">
            <div class="card-header" >
              <div class="card-header__title">
                Enlaces Importantes
              </div>
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
              <ion-item v-for="(item, index) of enlacesImportantes" :key="index">
                <ion-label>
                  <h2>{{ item.titulo }}</h2>
                  <a :href="item.direccion_url" >{{ item.direccion_url }}</a>
                </ion-label>
              </ion-item>
            </ion-list>
          </ion-card>
          <ion-card class="contactos-card">
            <div class="card-header" >
              <div class="card-header__title">
                Contactos Importantes
              </div>
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
              <ion-item v-for="(item, index) of contactosImportantes" :key="index">
                <ion-avatar aria-hidden="true" slot="start">
                  <img alt="" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
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
      <div class=" footer-buttons ">
        <ion-button expand="block" fill="clear" size="large" :class="tabActive === 'noticias' ? 'tab-active' : ''" @click="() => { toggleTabActive('noticias') }" >
          <ion-icon :icon="newspaper" ></ion-icon>
        </ion-button>
        <ion-button expand="block" fill="clear" size="large" :class="tabActive === 'contactos' ? 'tab-active' : ''" @click="() => { toggleTabActive('contactos') }">
          <ion-icon :icon="idCard" ></ion-icon>
        </ion-button>
      </div>
    </ion-footer>
  </ion-page>
</template>

<script setup>
import { IonPage, IonIcon, IonButton, IonButtons, IonCard, IonImg } from '@ionic/vue';
import { sunnyOutline, moon, logOut, personCircle, book, bookmarkOutline, trashBin, newspaper, idCard, brush } from 'ionicons/icons';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

const isDark = computed(() => store.getters['darkLight/isDark']);
const tabActive = ref('noticias');

const noticiasEventos = ref([
  {
    usuario: 'TDS',
    categoria: 'Webinar',
    fecha: 'Nov 16, 2024',
    titulo: 'Webinar Open Day Energía y Medio Ambiente: Carreras que Impulsan la Transición Hacia un Futuro Sostenible',
    descripcion: 'Únete a nosotros en un webinar único donde exploraremos la crisis climática actual y las oportunidades que ofrece el sector de la energía y el medio ambiente. Este evento está dirigido a jóvenes desde 17 años y profesionales interesados en especializarse en carreras que son cruciales para un futuro sostenible.',
    image_url: 'https://www.galileo.edu/wp-content/uploads/2024/09/Portada-evento.png'
  },
  {
    usuario: 'GALILEO',
    categoria: 'Novedades',
    fecha: 'Nov 5, 2024',
    titulo: 'Potencia tu Estrategia Empresarial con Business Intelligence',
    descripcion: '¡Prepárate para transformar tu estrategia empresarial! 🚀 El curso «Potencia tu Estrategia Empresarial con Business Intelligence» es una oportunidad única para aprender a dominar las herramientas de análisis de datos que están revolucionando la toma de decisiones en empresas de toda Latinoamérica.',
    image_url: 'https://www.galileo.edu/wp-content/uploads/2024/09/Carrusel-edX-2-artes-554-x-674-px.png'
  },
  {
    usuario: 'TDS',
    categoria: 'Invitacion',
    fecha: 'OCT 31, 2024',
    titulo: 'TeleCom BootCamp 2024',
    descripcion: 'Queremos invitarte al TeleCom Bootcamp de Ingeniería en Telecomunicaciones y Redes, este es un evento diseñado para ayudarte a explorar y desarrollar tus habilidades en un campo en constante evolución',
    image_url: 'https://www.galileo.edu/wp-content/uploads/2024/10/2_1.png'
  },
  {
    usuario: 'TDS',
    categoria: 'Invitacion',
    fecha: 'OCT 28, 2024',
    titulo: 'Diplomado Scrum',
    descripcion: 'Queremos invitarte al TeleCom Bootcamp de Ingeniería en Telecomunicaciones y Redes, este es un evento diseñado para ayudarte a explorar y desarrollar tus habilidades en un campo en constante evolución',
    image_url: 'https://www.galileo.edu/wp-content/uploads/2024/10/2_1.png'
  }
]);

const enlacesImportantes = ref([
  { titulo: 'Pensum', direccion_url: 'https://www.galileo.edu/ivn/carrera/tecnico-desarrollo-software-tds/' },
  { titulo: 'Pagar mi U', direccion_url: 'https://www.galileo.edu/pagos/no-registrados/' }
])

const contactosImportantes = ref([
  { nombre: 'Alex Jhonson', puesto: 'Senior Product Designer, Innovatech Solutions', correo_electronico: 'aliconnors@example.com', telefono: '(650) 6564-3492' },
  { nombre: 'Jamie Smith', puesto: 'UX Research Lead, UserFirst Insights', correo_electronico: 'jamiesmith@example.com', telefono: '(502) 5635-1946' },
  { nombre: 'Chris Brown', puesto: 'Head of Product Management, TechPioneers', correo_electronico: 'chrisbrown@example.com', telefono: '(503) 3894-7493' }
])

const logout = () => {
  router.push('login');
};

const toggleChange = () => {
  store.dispatch('darkLight/toggleDarkMode');
};

const toggleTabActive = (tabName) => {
  tabActive.value = tabName;
};
</script>

<style scoped>
gn-ion-content::part(background) {
  background: transparent;
}

.topbar__title  {
  text-align: center;
  font-weight: bold;
  font-size: 24px;
}
</style>