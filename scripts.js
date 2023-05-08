// Function to create a repository card
function createRepoCard(repo) {
    const card = document.createElement('div');
    card.classList.add('column', 'is-one-third');
  
    card.innerHTML = `
      <div class="card">
        <div class="card-content">
          <h5 class="title is-5">${repo.name}</h5>
          <p>${repo.description || 'No description provided.'}</p>
        </div>
        <footer class="card-footer">
          <small class="text-muted card-footer-item">Last updated: ${new Date(repo.updated_at).toLocaleDateString()}</small>
          <a href="${repo.html_url}" target="_blank" class="button is-primary card-footer-item">View on GitHub</a>
        </footer>
      </div>
    `;
  
    return card;
  }
  
// Replace 'your_token_here' with the generated token
const token = 'XXX';

const repoContainer = document.getElementById('repo-container');

fetch('https://api.github.com/users/jonowood/repos', {
  headers: {
    'Authorization': `token ${token}`,
  },
})
  .then(response => response.json())
  .then(repos => {
    if (Array.isArray(repos)) {
      repos.forEach(repo => {
        const repoCard = createRepoCard(repo);
        repoContainer.appendChild(repoCard);
      });
    } else {
      console.error('Error: Unexpected response format');
      repoContainer.innerHTML = '<p class="has-text-danger">Error loading repositories. Please try again later.</p>';
    }
  })
  .catch(error => {
    console.error('Error fetching repositories:', error);
    repoContainer.innerHTML = '<p class="has-text-danger">Error loading repositories. Please try again later.</p>';
  });

  // Function to fetch repositories by page number
  let pageNumber = 1;
  const perPage = 9;
  let isLoading = false;
  
  function fetchRepos() {
    if (isLoading) return;
    isLoading = true;
  
    fetch(`https://api.github.com/users/jonowood/repos?page=${pageNumber}&per_page=${perPage}`, {
      headers: {
        'Authorization': `token ${token}`,
      },
    })
      .then(response => response.json())
      .then(repos => {
        isLoading = false;
        if (Array.isArray(repos)) {
          repos.forEach(repo => {
            const repoCard = createRepoCard(repo);
            repoContainer.appendChild(repoCard);
          });
          pageNumber++;
        } else {
          console.error('Error: Unexpected response format');
        }
      })
      .catch(error => {
        isLoading = false;
        console.error('Error fetching repositories:', error);
      });
  }
  
  // Add an event listener for the scroll event to implement infinite scrolling
  window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
      fetchRepos();
    }
  });
  
  // Initialize the carousel when the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', () => {
    // Initialize the Bulma-Extensions carousel
    const carousel = bulmaCarousel.attach('#featured-projects .carousel', {
      slidesToScroll: 1,
      slidesToShow: 1,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 3000,
    });
  
    // Fetch the initial repositories
    fetchRepos();
  });
  