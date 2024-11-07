<template>
    <ion-page :class="{ 'ion-palette-dark': isDark }">
        <gn-ion-content>
            <div class="topbar">
                <div class="topbar__title">
                    <div>
                        <ion-icon :icon="happyOutline" class="topbar__icon"></ion-icon>
                    </div>
                    <span>GalileoNews</span>
                    <div class="w-grow"></div>
                    <ion-buttons>
                        <ion-button color="dark" @click="toggleChange">
                            <ion-icon :icon="isDark ? sunnyOutline : moon" class="topbar__icon"></ion-icon>
                        </ion-button>
                    </ion-buttons>
                </div>
            </div>
            <div class="login__background">
                <div class="login__title">
                    <span>Galileo News</span>
                </div>
                <div id="register-login">
                    <form id="login" name="login" class="margin-form" @submit.prevent="onSubmitForm">
                        <div class="container-form">
                            <div class="form-widget">
                                <ion-input v-model="formModel.email" label-placement="stacked" id="email" type="text"
                                    name="email" label="Correo Electrónico" placeholder="Ingresa tu correo" />
                                <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
                            </div>
                            <div class="form-widget">
                                <ion-input v-model="formModel.password" label-placement="stacked" id="password"
                                    type="password" name="password" label="Contraseña"
                                    placeholder="Ingresa tu contraseña">
                                    <ion-input-password-toggle></ion-input-password-toggle>
                                </ion-input>
                                <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
                            </div>
                            <div class="form-widget remember-divisor">
                                <ion-checkbox v-model="formModel.rememberMe" id="rememberMe"></ion-checkbox>
                                <label class="remember-me-txt" for="rememberMe">
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
                            <a href="#" class="button">Soporte</a>
                        </span>
                        <span class="Faqs2">
                            <a href="/login" @click.prevent="returnToRegister">No tienes una cuenta?
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </gn-ion-content>
    </ion-page>
</template>

<script setup>
import {
    IonPage,
    IonIcon,
    IonButton,
    IonButtons,
    IonInput,
    IonInputPasswordToggle,
    IonCheckbox,
} from "@ionic/vue";
import { happyOutline, sunnyOutline, moon, logoGoogle } from "ionicons/icons";
import { ref, reactive, computed } from "vue";
import authService from "@/services/authService";
import storage from "@/services/storageService";
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { alertController } from "@ionic/vue";

const router = useRouter();
const store = useStore();

const isDark = computed(() => store.getters['darkLight/isDark']);

const formModel = reactive({
    email: "",
    password: "",
    rememberMe: false,
});

const errors = reactive({
    email: "",
    password: "",
});

const validateForm = () => {
    errors.email = formModel.email ? "" : "El correo electrónico es obligatorio.";
    errors.password = formModel.password ? "" : "La contraseña es obligatoria.";
    return !errors.email && !errors.password;
};

const showErrorAlert = async (errorMessage) => {
    const alert = await alertController.create({
        header: "ERROR",
        message: errorMessage,
        buttons: ["OK"],
    });
    await alert.present();
};

const onSubmitForm = async () => {
    if (validateForm()) {
        try {
            const response = await authService.login(formModel.email, formModel.password);
            console.log(response);
            await storage.set('token', response.token);
            router.push('/home');
        } catch (error) {
            await showErrorAlert('Error al iniciar sesión: ' + String(error && error.message));
            console.error('Error al iniciar sesión:', error);
        }
    } else {
        console.log("Validation failed");
    }
};

const onGoogleSignIn = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
};

const returnToRegister = () => {
    router.push('/register');
};

const toggleChange = () => {
    store.dispatch('darkLight/toggleDarkMode');
};
</script>

<style scoped>
gn-ion-content::part(background) {
    background: transparent;
}

.error-message {
    color: #ff8800;
    font-size: 0.7em;
}
</style>
