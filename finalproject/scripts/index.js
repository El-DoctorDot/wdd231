import { F1DataAPI, ContentGenerator, ModalManager } from './utils.js';

// Function to scroll to the content section
function scrollToContent() {
    const contentSection = document.querySelector('.content-section');
    contentSection.scrollIntoView({ behavior: 'smooth' });
}

// Function to retry loading data (example, adjust as per your implementation)
async function retryDataLoad() {
    try {
        ModalManager.openModal('loadingModal');
        const data = await F1DataAPI.fetchData('drivers'); // Example, adjust the key
        const statsGrid = document.getElementById('statsGrid');
        statsGrid.innerHTML = ContentGenerator.generateStatsCards(data);
        ModalManager.closeModal('loadingModal');
    } catch (error) {
        ModalManager.openModal('errorModal');
        document.getElementById('errorMessage').textContent = `Failed to load data: ${error.message}`;
    }
}

// Add event listeners when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // "Explore History" button
    const heroButton = document.getElementById('heroButton');
    if (heroButton) {
        heroButton.addEventListener('click', scrollToContent);
    }

    // Close button for error modal
    const errorModalClose = document.getElementById('errorModalClose');
    if (errorModalClose) {
        errorModalClose.addEventListener('click', () => ModalManager.closeModal('errorModal'));
    }

    // "Try Again" button on the error modal
    const retryButton = document.getElementById('retryButton');
    if (retryButton) {
        retryButton.addEventListener('click', retryDataLoad);
    }

    // Load initial data (example, adjust as per your implementation)
    retryDataLoad();
});
