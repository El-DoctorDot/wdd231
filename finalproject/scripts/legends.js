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
    console.error('Error initializing Legends:', error);
    showError(error.message);
  }
});

async function initializeApp() {
  ModalManager.setupModalEvents();
  ModalManager.openModal('loadingModal');

  try {
    const data = await F1DataAPI.fetchData();
    appData = { ...appData, ...data };
    populateGrids();
    setupSearch();
    saveUserPreferences();
    ModalManager.closeModal('loadingModal');
  } catch (error) {
    ModalManager.closeModal('loadingModal');
    throw error;
  }
}

function populateGrids() {
  const driversGrid = document.getElementById('driversGrid');
  const teamsGrid = document.getElementById('teamsGrid');
  const racesGrid = document.getElementById('racesGrid');

  if (driversGrid) {
    const championDrivers = DataFilter.getChampionDrivers(appData.drivers);
    driversGrid.innerHTML = championDrivers
      .map(driver => ContentGenerator.generateDriverCard(driver))
      .join('');
  }
  if (teamsGrid) {
    teamsGrid.innerHTML = appData.teams
      .map(team => ContentGenerator.generateTeamCard(team))
      .join('');
  }
  if (racesGrid) {
    const memorableRaces = DataFilter.getMemorableRaces(appData.races);
    racesGrid.innerHTML = memorableRaces
      .map(race => ContentGenerator.generateRaceCard(race))
      .join('');
  }
}

function setupSearch() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value;
      const filteredDrivers = DataFilter.filterDriversBySearch(appData.drivers, query);
      const driversGrid = document.getElementById('driversGrid');
      if (driversGrid) {
        driversGrid.innerHTML = filteredDrivers
          .map(driver => ContentGenerator.generateDriverCard(driver))
          .join('');
      }
    });
  }
}

function showError(message) {
  const errorMessage = document.getElementById('errorMessage');
  if (errorMessage) {
    errorMessage.textContent = `Error loading data: ${message}. Make sure the file data/f1data.json is in the correct directory.`;
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

window.showTab = function(tabName) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
  document.getElementById(`${tabName}Tab`).classList.add('active');
  document.querySelector(`[onclick="showTab('${tabName}')"]`).classList.add('active');
};

window.clearSearch = function() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.value = '';
    populateGrids();
  }
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

window.closeModal = function(modalId) {
  ModalManager.closeModal(modalId);
};

console.log('F1 Stories - Legends Page Launched');
