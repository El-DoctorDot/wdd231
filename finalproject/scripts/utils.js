export class LocalStorageManager {
  static setItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving to localStorage for key "${key}":`, error);
    }
  }

  static getItem(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage for key "${key}":`, error);
      return defaultValue;
    }
  }

  static removeItem(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from localStorage for key "${key}":`, error);
    }
  }
}

export class F1DataAPI {
  static async fetchData(type = 'all') {
    try {
      const response = await fetch('./data/f1data.json'); 
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      const result = {
        drivers: data.drivers,
        teams: data.teams,
        races: data.races,
        techEvolutions: data.techEvolutions
      };

      return type === 'all' ? result : (result[type] || []);
    } catch (error) {
      console.error('Error fetching F1 data:', error);
      throw error;
    }
  }
}

export class ModalManager {
  static openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  }

  static closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('show');
      document.body.style.overflow = 'unset';
    }
  }

  static setupModalEvents() {
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal')) {
        const modalId = e.target.id;
        this.closeModal(modalId);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal.show');
        if (openModal) {
          this.closeModal(openModal.id);
        }
      }
    });
  }
}

export class DataFilter {
  static filterDriversBySearch(drivers, query) {
    return drivers.filter(driver =>
      driver.name.toLowerCase().includes(query.toLowerCase()) ||
      driver.nationality.toLowerCase().includes(query.toLowerCase()) ||
      driver.team.toLowerCase().includes(query.toLowerCase())
    );
  }

  static getTopDriversByWins(drivers, limit = 5) {
    return drivers
      .slice()
      .sort((a, b) => b.wins - a.wins)
      .slice(0, limit);
  }

  static getChampionDrivers(drivers) {
    return drivers.filter(driver => driver.championships > 0);
  }

  static getMemorableRaces(races) {
    return races.filter(race => race.memorable);
  }

  static getTotalWinsByNationality(drivers) {
    return drivers.reduce((acc, driver) => {
      acc[driver.nationality] = (acc[driver.nationality] || 0) + driver.wins;
      return acc;
    }, {});
  }
}

export class ContentGenerator {
  static generateDriverCard(driver) {
    return `
      <div class="card" onclick="showDriverDetails(${driver.id})">
        <img class="card-image" src="${driver.image}" alt="${driver.name}" loading="lazy">
        <div class="card-content">
          <h3 class="card-title">${driver.name}</h3>
          <p class="card-subtitle">${driver.nationality} • ${driver.team}</p>
          <div class="card-stats">
            <div class="stat">
              <span class="stat-value">${driver.championships}</span>
              <span class="stat-label">Championships</span>
            </div>
            <div class="stat">
              <span class="stat-value">${driver.wins}</span>
              <span class="stat-label">Wins</span>
            </div>
            <div class="stat">
              <span class="stat-value">${driver.podiums}</span>
              <span class="stat-label">Podiums</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static generateTeamCard(team) {
    return `
      <div class="card">
        <img class="card-image" src="${team.logo}" alt="${team.name} Logo" loading="lazy">
        <div class="card-content">
          <h3 class="card-title">${team.name}</h3>
          <p class="card-subtitle">${team.nationality} • Founded in ${team.founded}</p>
          <p>${team.description}</p>
          <div class="card-stats">
            <div class="stat">
              <span class="stat-value">${team.championships}</span>
              <span class="stat-label">Championships</span>
            </div>
            <div class="stat">
              <span class="stat-value">${team.wins}</span>
              <span class="stat-label">Wins</span>
            </div>
          </div>
          <p><strong>Drivers:</strong> ${team.drivers.join(', ')}</p>
        </div>
      </div>
    `;
  }

  static generateRaceCard(race) {
    return `
      <div class="card">
        <img class="card-image" src="${race.image}" alt="${race.circuit}" loading="lazy">
        <div class="card-content">
          <h3 class="card-title">${race.name}</h3>
          <p class="card-subtitle">${race.circuit} • ${race.country}</p>
          <p>${race.description}</p>
          <div class="card-stats">
            <div class="stat">
              <span class="stat-value">${race.year}</span>
              <span class="stat-label">Year</span>
            </div>
            <div class="stat">
              <span class="stat-value">${race.memorable ? 'Yes' : 'No'}</span>
              <span class="stat-label">Memorable</span>
            </div>
          </div>
          <p><strong>Winner:</strong> ${race.winner}</p>
          <p><strong>Fastest Lap:</strong> ${race.fastestLap}</p>
        </div>
      </div>
    `;
  }

  static generateTimelineItem(evolution) {
    return `
      <div class="timeline-item" onclick="showEvolutionDetails(${evolution.id})">
        <div class="timeline-year">${evolution.year}</div>
        <div class="timeline-content">
          <h3 class="timeline-title">${evolution.innovation}</h3>
          <p>${evolution.description}</p>
          <p><strong>Impact:</strong> ${evolution.impact}</p>
        </div>
      </div>
    `;
  }

  static generateDriverModal(driver) {
    return `
      <div class="modal-header">
        <img class="modal-image" src="${driver.image}" alt="${driver.name}">
        <div>
          <h2 class="modal-title">${driver.name}</h2>
          <p class="modal-subtitle">${driver.nationality} • ${driver.team}</p>
        </div>
      </div>
      <div class="modal-stats">
        <div class="stat">
          <span class="stat-value">${driver.championships}</span>
          <span class="stat-label">Championships</span>
        </div>
        <div class="stat">
          <span class="stat-value">${driver.wins}</span>
          <span class="stat-label">Wins</span>
        </div>
        <div class="stat">
          <span class="stat-value">${driver.podiums}</span>
          <span class="stat-label">Podiums</span>
        </div>
      </div>
      <h3>Biography</h3>
      <p>${driver.biography}</p>
    `;
  }

  static generateEvolutionModal(evolution) {
    return `
      <h2 class="modal-title">${evolution.innovation} (${evolution.year})</h2>
      <div style="margin: 20px 0; padding: 20px; background: #f5f5f5; border-radius: 8px;">
        <img src="${evolution.image}" alt="${evolution.innovation}" style="max-width: 100%; border-radius: 8px;">
      </div>
      <h3>Description</h3>
      <p>${evolution.description}</p>
      <h3>Impact</h3>
      <p>${evolution.impact}</p>
    `;
  }

  static generateStatsCards(drivers) {
    const totalWins = drivers.reduce((sum, driver) => sum + driver.wins, 0);
    const totalChampionships = drivers.reduce((sum, driver) => sum + driver.championships, 0);
    const avgWins = (totalWins / drivers.length).toFixed(1);
    const topWinner = drivers.reduce((top, driver) =>
      driver.wins > top.wins ? driver : top
    );

    return `
      <div class="stats-card">
        <h4>${totalWins}</h4>
        <p>Total Wins</p>
      </div>
      <div class="stats-card">
        <h4>${totalChampionships}</h4>
        <p>Total Championships</p>
      </div>
      <div class="stats-card">
        <h4>${avgWins}</h4>
        <p>Average Wins</p>
      </div>
      <div class="stats-card">
        <h4>${topWinner.wins}</h4>
        <p>Top Winner</p>
      </div>
    `;
  }
}