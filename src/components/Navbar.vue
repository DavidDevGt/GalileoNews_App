<template>
    <ion-toolbar :color="isDark ? 'medium' : 'light'">
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
      <ion-title class="topbar__title">Galileo News</ion-title>
    </ion-toolbar>
  </template>
  
  <script setup>
  import { IonToolbar, IonButtons, IonButton, IonIcon } from '@ionic/vue';
  import { sunnyOutline, moon, logOut } from 'ionicons/icons';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const isDark = ref(false);
  
  const logout = async () => {
    await storage.remove("token");
    router.push('login');
  };
  
  const toggleChange = () => {
    isDark.value = !isDark.value;
  };
  </script>
  
  <style scoped>
  .topbar__title {
    text-align: center;
    font-weight: bold;
    font-size: 24px;
  }
  </style>