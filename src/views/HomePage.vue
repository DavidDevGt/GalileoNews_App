<template>
  <ion-page>
    <ion-content>
      <div class="topbar">
        <div class="topbar__title">
          <div >
            <ion-icon :icon="happyOutline" class="topbar__icon"></ion-icon>
          </div>
          <span >Noticias Galileo App</span>
          <div class=" w-grow " >
          </div>
          <ion-buttons>
            <ion-button color="dark" @click="toggleChange" >
              <ion-icon :icon="isDark ? sunnyOutline : moon" class="topbar__icon" ></ion-icon>
            </ion-button>
          </ion-buttons>
        </div>
      </div>
      <div class="login__background">
        <div class="login__title">
          <span>Galileo News</span>
        </div>
        <div id="register-login">
          <form id="login" name="login" class="margin-form" novalidate @submit="(event) => { event.preventDefault() }" style="margin: 0px;">
            <div><input type="hidden" name="form:mode" value="edit"></div>
            <div><input type="hidden" name="form:id" value="login"></div>
            <div class="container-form">
              <div class="form-widget">
                <ion-input
                  ref="inpEmail"
                  label-placement="stacked"
                  id="email"
                  type="text"
                  name="email"
                  label="Ingresar Usuario o Email"
                  placeholder="Correo Electrónico" />
              </div>
              <div class="form-widget">
                <ion-input
                  ref="inpPassword"
                  label-placement="stacked"
                  id="password"
                  type="password"
                  name="password"
                  label="Ingresar Contraseña"
                  placeholder="Contraseña" >
                  <ion-input-password-toggle></ion-input-password-toggle>
                </ion-input>
                <div class="cont-lost-password">
                  <span class="Faqs2">
                    <a href="#" class="button">¿Olvidó su
                      contraseña?</a>
                  </span>
                </div>
              </div>
              <div class="form-element">
                <div class="form-actions">
                  <input type="submit" name="formbutton:ok" value="Entrar" @click="onSubmitForm" >
                </div>
              </div>
              <div class="form-widget">
                <input type="checkbox" name="persistent_p" value="t" id="login:elements:persistent_p:t" checked="checked">
                <label for="login:elements:persistent_p:t">
                  Recordar mi contraseña en esta computadora
                </label>
              </div>
            </div>
          </form>
          <div class="sign-in-button">
            <div class="or">O</div>
            <div class="google_signin" >
              <div class="google__icon" >
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="LgbsSe-Bz112c">
                  <g>
                    <path fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z">
                    </path>
                    <path fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z">
                    </path>
                    <path fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z">
                    </path>
                    <path fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z">
                    </path>
                    <path fill="none" d="M0 0h48v48H0z"></path>
                  </g>
                </svg>
              </div>
              <span>Acceder con Google</span>
            </div>
          </div>
          <br>
          <div class="cont-standard">
            <span class="Faqs2">
              <a href="#" class="button">Soporte </a>
            </span>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
  import { IonPage, IonIcon, IonButton, IonButtons, IonInput, IonInputPasswordToggle } from '@ionic/vue';
  import { happyOutline, sunnyOutline, moon } from 'ionicons/icons'
  import { ref } from 'vue'
  
  const isDark = ref(false);
  const inpEmail = ref();
  const inpPassword = ref();

  const onSubmitForm = () => {
    const formModel = {}
    const arrInputs = []
    arrInputs.push(inpEmail.value)
    arrInputs.push(inpPassword.value)
    arrInputs.forEach((inputCmp) => {
      if (inputCmp !== undefined) {
        const inpName = inputCmp.$el.id
        const inpValue = inputCmp.$el.value
        formModel[inpName] = inpValue
      }
    })
    console.log('formModel', JSON.stringify(formModel))
  }

  // Use matchMedia to check the user preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  // Add or remove the "ion-palette-dark" class on the html element
  const toggleDarkPalette = (shouldAdd) => {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
    isDark.value = shouldAdd
  };

  // Check/uncheck the toggle and update the palette based on isDark
  const initializeDarkPalette = (_isDark) => {
    toggleDarkPalette(_isDark);
  };

  // Initialize the dark palette based on the initial
  // value of the prefers-color-scheme media query
  initializeDarkPalette(prefersDark.matches);

  // Listen for changes to the prefers-color-scheme media query
  prefersDark.addEventListener('change', (mediaQuery) => initializeDarkPalette(mediaQuery.matches));

  // Listen for the toggle check/uncheck to toggle the dark palette
  const toggleChange = () => {
    toggleDarkPalette(!isDark.value);
  }
</script>
<style scoped>
  ion-content::part(background) {
    background: transparent;
  }
</style>