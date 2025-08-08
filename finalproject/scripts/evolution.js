import { F1DataAPI, ContentGenerator, ModalManager } from './utils.js';

// Function to load and display the timeline
async function loadTimeline() {
    ModalManager.openModal('loadingModal');
    try {
        const techEvolutions = await F1DataAPI.fetchData('techEvolutions');
        const timeline = document.getElementById('evolutionTimeline');
        if (timeline) {
            timeline.innerHTML = techEvolutions
                .map(evolution => ContentGenerator.generateTimelineItem(evolution))
                .join('');
        }
        ModalManager.closeModal('loadingModal');
    } catch (error) {
        ModalManager.closeModal('loadingModal');
        ModalManager.openModal('errorModal');
        const errorMessage = document.getElementById('errorMessage');
        if (errorMessage) {
            errorMessage.textContent = 'Failed to load technological evolutions. Please try again.';
        }
    }
}

// Function to display evolution details in a modal
window.showEvolutionDetails = async function(id) {
    try {
        const techEvolutions = await F1DataAPI.fetchData('techEvolutions');
        const evolution = techEvolutions.find(e => e.id === id);
        if (evolution) {
            const modalContent = document.getElementById('evolutionModalContent');
            if (modalContent) {
                modalContent.innerHTML = ContentGenerator.generateEvolutionModal(evolution);
                ModalManager.openModal('evolutionModal');
            }
        }
    } catch (error) {
        ModalManager.openModal('errorModal');
        const errorMessage = document.getElementById('errorMessage');
        if (errorMessage) {
            errorMessage.textContent = 'Failed to load evolution details. Please try again.';
        }
    }
};

// Function to retry loading data
window.retryDataLoad = function() {
    ModalManager.closeModal('errorModal');
    loadTimeline();
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    ModalManager.setupModalEvents();
    loadTimeline();
});
