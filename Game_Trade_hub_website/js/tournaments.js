localStorage.removeItem('tournaments');
const tournaments = [
    {
        id: 1,
        game: "PUBG Mobile",
        date: "June 30, 2025",
        entryFee: "PKR 500",
        platform: "Mobile",
        image: "images/pubg.jpg",
        description: "Squad tournament with prize pool of PKR 50,000"
    },
    {
        id: 2,
        game: "Tekken 8",
        date: "July 15, 2025",
        entryFee: "PKR 1,000",
        platform: "PS5",
        image: "images/tekken 8.jpg",
        description: "1v1 tournament with prize pool of PKR 30,000"
    },
    {
        id: 3,
        game: "Valorant",
        date: "July 22, 2025",
        entryFee: "Free",
        platform: "PC",
        image: "images/valorant.jpg",
        description: "5v5 tournament with in-game prizes"
    }
];

function renderTournaments() {
    const container = document.getElementById('tournamentsContainer');
    const noTournamentsMsg = document.getElementById('noTournamentsMessage');

    if (tournaments.length === 0) {
        container.classList.add('hidden');
        noTournamentsMsg.classList.remove('hidden');
        return;
    }

    container.classList.remove('hidden');
    noTournamentsMsg?.classList.add('hidden'); // optional chaining in case it's null
    container.innerHTML = '';

    tournaments.forEach(tournament => {
        const tournamentCard = document.createElement('div');
        tournamentCard.className = 'tournament-card';
        tournamentCard.innerHTML = `
            <img src="${tournament.image}" alt="${tournament.game}" class="tournament-img">
            <div class="tournament-details">
                <h3>${tournament.game}</h3>
                <p class="date"><strong>Date:</strong> ${tournament.date}</p>
                <p class="fee"><strong>Entry Fee:</strong> ${tournament.entryFee}</p>
                <p class="platform"><strong>Platform:</strong> ${tournament.platform}</p>
                <p class="description">${tournament.description}</p>
                <button class="btn join-btn" data-id="${tournament.id}">Join Tournament</button>
            </div>
        `;
        container.appendChild(tournamentCard);
    });

    document.querySelectorAll('.join-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            joinTournament(id);
        });
    });
}

function joinTournament(id) {
    const tournament = tournaments.find(t => t.id === parseInt(id));
    if (tournament) {
        alert(`You have successfully joined the ${tournament.game} tournament!`);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'index.html';
    }
    renderTournaments();
});
