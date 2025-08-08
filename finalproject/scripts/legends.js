import { F1DataAPI, ContentGenerator, ModalManager, DataFilter } from './utils.js';

async function loadContent() {
  try {
    ModalManager.openModal('loadingModal');
    const data = await F1DataAPI.fetchData('all');

    // Load drivers
    const driversGrid = document.getElementById('driversGrid');
    driversGrid.innerHTML = DataFilter.getChampionDrivers(data.drivers)
      .map(driver => ContentGenerator.generateDriverCard(driver))
      .join('');

    // Add click events to driver cards
    const driverCards = document.querySelectorAll('.card[data-id]');
    driverCards.forEach(card => {
      card.addEventListener('click', () => {
        const driverId = parseInt(card.getAttribute('data-id'));
        showDriverDetails(driverId);
      });
    });

    // Load teams
    const teamsGrid = document.getElementById('teamsGrid');
    teamsGrid.innerHTML = data.teams
      .map(team => ContentGenerator.generateTeamCard(team))
      .join('');

    // Load memorable races
    const racesGrid = document.getElementById('racesGrid');
    racesGrid.innerHTML = DataFilter.getMemorableRaces(data.races)
      .map(race => ContentGenerator.generateRaceCard(race))
      .join('');

    ModalManager.closeModal('loadingModal');
  } catch (error) {
    ModalManager.openModal('errorModal');
    document.getElementById('errorMessage').textContent = `Failed to load legends data: ${error.message}`;
  }
}

async function showDriverDetails(driverId) {
  try {
    const drivers = await F1DataAPI.fetchData('drivers');
    const driver = drivers.find(d => d.id === driverId);
    if (driver) {
      const modalContent = document.querySelector('#driverModal .modal-content');
      modalContent.innerHTML = ContentGenerator.generateDriverModal(driver);
      ModalManager.openModal('driverModal');
    }
  } catch (error) {
    ModalManager.openModal('errorModal');
    document.getElementById('errorMessage').textContent = `Failed to load driver details: ${error.message}`;
  }
}

function showTab(tabId) {
  // Remove 'active' class from all tabs and contents
  document.querySelectorAll('.tab-button').forEach(button => {
    button.classList.remove('active');
  });
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
  });

  // Add 'active' class to selected tab and content
  document.getElementById(`${tabId}TabButton`).classList.add('active');
  document.getElementById(`${tabId}Tab`).classList.add('active');
}

function clearSearch() {
  const searchInput = document.getElementById('searchInput');
  searchInput.value = '';
  searchInput.dispatchEvent(new Event('input')); // Trigger search update
}

async function handleSearch() {
  const searchInput = document.getElementById('searchInput');
  const query = searchInput.value.trim();
  try {
    const drivers = await F1DataAPI.fetchData('drivers');
    const filteredDrivers = DataFilter.filterDriversBySearch(drivers, query);
    const driversGrid = document.getElementById('driversGrid');
    driversGrid.innerHTML = filteredDrivers
      .map(driver => ContentGenerator.generateDriverCard(driver))
      .join('');

    // Re-add click events to driver cards after search
    const driverCards = document.querySelectorAll('.card[data-id]');
    driverCards.forEach(card => {
      card.addEventListener('click', () => {
        const driverId = parseInt(card.getAttribute('data-id'));
        showDriverDetails(driverId);
      });
    });
  } catch (error) {
    ModalManager.openModal('errorModal');
    document.getElementById('errorMessage').textContent = `Failed to load search results: ${error.message}`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ModalManager.setupModalEvents();

  // Hero button to navigate to attributions.html
  const heroButton = document.getElementById('heroButton');
  if (heroButton) {
    heroButton.addEventListener('click', () => {
      window.location.href = 'attributions.html';
    });
  }

  // Clear search button
  const clearSearchButton = document.getElementById('clearSearchButton');
  if (clearSearchButton) {
    clearSearchButton.addEventListener('click', clearSearch);
  }

  // Tab buttons
  const driversTabButton = document.getElementById('driversTabButton');
  const teamsTabButton = document.getElementById('teamsTabButton');
  const racesTabButton = document.getElementById('racesTabButton');
  
  if (driversTabButton) {
    driversTabButton.addEventListener('click', () => showTab('drivers'));
  }
  if (teamsTabButton) {
    teamsTabButton.addEventListener('click', () => showTab('teams'));
  }
  if (racesTabButton) {
    racesTabButton.addEventListener('click', () => showTab('races'));
  }

  // Modal close button
  const driverModalClose = document.getElementById('driverModalClose');
  if (driverModalClose) {
    driverModalClose.addEventListener('click', () => ModalManager.closeModal('driverModal'));
  }

  // Search input
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
  }

  // Load initial content
  loadContent();
});