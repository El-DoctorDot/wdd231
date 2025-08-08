import { F1DataAPI, ContentGenerator, ModalManager } from './utils.js';

async function loadEvolutions() {
  try {
    ModalManager.openModal('loadingModal');
    const evolutions = await F1DataAPI.fetchData('techEvolutions');
    const timeline = document.getElementById('evolutionTimeline');
    timeline.innerHTML = evolutions.map(evo => ContentGenerator.generateTimelineItem(evo)).join('');

    // Add click events to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item[data-id]');
    timelineItems.forEach(item => {
      item.addEventListener('click', () => {
        const evolutionId = parseInt(item.getAttribute('data-id'));
        showEvolutionDetails(evolutionId);
      });
    });

    ModalManager.closeModal('loadingModal');
  } catch (error) {
    ModalManager.openModal('errorModal');
    document.getElementById('errorMessage').textContent = `Failed to load evolutions: ${error.message}`;
  }
}

async function showEvolutionDetails(evolutionId) {
  try {
    const evolutions = await F1DataAPI.fetchData('techEvolutions');
    const evolution = evolutions.find(e => e.id === evolutionId);
    if (evolution) {
      const modalContent = document.querySelector('#evolutionModal .modal-content');
      modalContent.innerHTML = ContentGenerator.generateEvolutionModal(evolution);
      ModalManager.openModal('evolutionModal');
    }
  } catch (error) {
    ModalManager.openModal('errorModal');
    document.getElementById('errorMessage').textContent = `Failed to load evolution details: ${error.message}`;
  }
}

function retryDataLoad() {
  ModalManager.closeModal('errorModal');
  loadEvolutions();
}

document.addEventListener('DOMContentLoaded', () => {
  ModalManager.setupModalEvents();

  // Evolution modal close button
  const evolutionModalClose = document.getElementById('evolutionModalClose');
  if (evolutionModalClose) {
    evolutionModalClose.addEventListener('click', () => ModalManager.closeModal('evolutionModal'));
  }

  // Error modal close button
  const errorModalClose = document.getElementById('errorModalClose');
  if (errorModalClose) {
    errorModalClose.addEventListener('click', () => ModalManager.closeModal('errorModal'));
  }

  // Retry button
  const retryButton = document.getElementById('retryButton');
  if (retryButton) {
    retryButton.addEventListener('click', retryDataLoad);
  }

  // Load initial content
  loadEvolutions();
});
