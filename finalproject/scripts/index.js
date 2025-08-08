import { F1DataAPI, LocalStorageManager, ModalManager, DataFilter, ContentGenerator } from './utils.js';

let appData = {
  drivers: [],
  teams: [],
  races: [],
  techEvolutions: [],
  userPreferences: LocalStorageManager.getItem('f1Preferences', {
    favoriteDrivers: [],
    theme: 'light',
    language: 'en'
  })
};

document.addEventListener('DOMContentLoaded', async () => {
  try {
    await initializeApp();
  } catch (error) {
    console.error('Erro na inicialização:', error);
    showError(error.message);
  }
});

async function initializeApp() {
  ModalManager.setupModalEvents();
  ModalManager.openModal('loadingModal');
  
  try {
    const data = await F1DataAPI.fetchData();
    appData = { ...appData, ...data };
    generateStats();
    saveUserPreferences();
    ModalManager.closeModal('loadingModal');
  } catch (error) {
    ModalManager.closeModal('loadingModal');
    throw error;
  }
}

function generateStats() {
  const statsGrid = document.getElementById('statsGrid');
  if (!statsGrid) return;

  const championDrivers = DataFilter.getChampionDrivers(appData.drivers);
  const totalStats = ContentGenerator.generateStatsCards(championDrivers);
  statsGrid.innerHTML = totalStats;
}

function showError(message) {
  const errorMessage = document.getElementById('errorMessage');
  if (errorMessage) {
    errorMessage.textContent = message;
  }
  ModalManager.openModal('errorModal');
}

window.retryDataLoad = async function() {
  ModalManager.closeModal('errorModal');
  try {
    await initializeApp();
  } catch (error) {
    showError(error.message);
  }
};

function saveUserPreferences() {
  LocalStorageManager.setItem('f1Preferences', appData.userPreferences);
}

window.scrollToContent = function() {
  const contentSection = document.querySelector('.content-section');
  if (contentSection) {
    contentSection.scrollIntoView({
      behavior: 'smooth'
    });
  }
};

window.closeModal = function(modalId) {
  ModalManager.closeModal(modalId);
};

window.showDriverDetails = function(driverId) {
  const driver = appData.drivers.find(d => d.id === driverId);
  if (driver) {
    const modalContent = ContentGenerator.generateDriverModal(driver);
    const modal = document.getElementById('driverModal');
    if (modal) {
      modal.querySelector('#driverModalContent').innerHTML = modalContent;
      ModalManager.openModal('driverModal');
    }
  }
};

window.showEvolutionDetails = function(evolutionId) {
  const evolution = appData.techEvolutions.find(e => e.id === evolutionId);
  if (evolution) {
    const modalContent = ContentGenerator.generateEvolutionModal(evolution);
    const modal = document.getElementById('evolutionModal');
    if (modal) {
      modal.querySelector('#evolutionModalContent').innerHTML = modalContent;
      ModalManager.openModal('evolutionModal');
    }
  }
};

console.log('F1 Stories - Application Launched');