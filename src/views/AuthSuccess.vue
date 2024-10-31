<template>
    <ion-page>
        <ion-content class="ion-padding">
            <div class="loading-container">
                <div v-if="loading" class="loading-content">
                    <ion-spinner name="circular" class="spinner"></ion-spinner>
                    <h2 class="loading-title">Procesando autenticación</h2>
                    <p class="loading-subtitle">Por favor espere un momento...</p>
                </div>
                <div v-else class="error-content">
                    <ion-icon :icon="alertCircleOutline" class="error-icon"></ion-icon>
                    <h2 class="error-title">Error de autenticación</h2>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { alertController } from '@ionic/vue';
import { 
    IonPage, 
    IonContent, 
    IonSpinner, 
    IonIcon 
} from '@ionic/vue';
import { alertCircleOutline } from 'ionicons/icons';
import storage from '@/services/storageService';

const router = useRouter();
const loading = ref(true);

const showErrorAlert = async () => {
    const alert = await alertController.create({
        header: 'Error de Autenticación',
        message: 'No se pudo completar la autenticación con Google. Por favor, intente nuevamente.',
        buttons: [{
            text: 'OK',
            handler: () => {
                router.push('/login');
            }
        }]
    });
    await alert.present();
};

onMounted(async () => {
    try {
        const token = new URLSearchParams(window.location.search).get('token');
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        if (token) {
            await storage.set('token', token);
            router.push('/home');
        } else {
            throw new Error('No se recibió el token de autenticación');
        }
    } catch (error) {
        loading.value = false;
        await showErrorAlert();
    }
});
</script>

<style scoped>
.loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
}

.loading-content, .error-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.spinner {
    width: 60px;
    height: 60px;
}

.loading-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 1rem 0 0.5rem;
}

.loading-subtitle {
    color: var(--ion-color-medium);
}

.error-icon {
    font-size: 4rem;
    color: var(--ion-color-danger);
}

.error-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--ion-color-danger);
}
</style>