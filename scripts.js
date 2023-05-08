// Function to create a repository card
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
  
  // Fetch repositories from GitHub API
  const repoContainer = document.getElementById('repo-container');
  
  fetch('https://api.github.com/users/jonowood/repos')
    .then(response => response.json())
    .then(repos => {
      repos.forEach(repo => {
        const repoCard = createRepoCard(repo);
        repoContainer.appendChild(repoCard);
      });
    })
    .catch(error => {
      console.error('Error fetching repositories:', error);
      repoContainer.innerHTML = '<p class="has-text-danger">Error loading repositories. Please try again later.</p>';
    });
  
  
  // Variables for pagination and infinite scrolling
  let currentPage = 1;
  const itemsPerPage = 6;
  
  // Function to fetch repositories by page number
  function fetchRepos(page) {
    fetch(`https://api.github.com/users/jonowood/repos?per_page=${itemsPerPage}&page=${page}`)
      .then(response => response.json())
      .then(data => {
        const repoContainer = document.getElementById('repo-container');
  
        data.forEach(repo => {
          const repoCard = createRepoCard(repo);
          repoContainer.appendChild(repoCard);
        });
      });
  }
  
  // Function to check if the user has scrolled to the bottom of the page
  function isScrolledToBottom() {
    return (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
  }
  
  // Function to create a carousel item
  function createCarouselItem(project, index) {
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
  
    if (index === 0) {
      carouselItem.classList.add('has-background');
    }
  
    carouselItem.innerHTML = `
      <img class="is-background" src="${project.imageURL}" alt="${project.title}" />
      <div class="title">${project.title}</div>
      <div class="subtitle">${project.description}</div>
      <a href="${project.projectURL}" target="_blank" class="button is-primary">View Project</a>
    `;
  
    return carouselItem;
  }
  
  // Fetch the first chunk of repositories when the page loads
  fetchRepos(currentPage);
  
  // Add an event listener for the scroll event to implement infinite scrolling
  window.addEventListener('scroll', () => {
    if (isScrolledToBottom()) {
      currentPage++;
      fetchRepos(currentPage);
    }
  });
  
  // Initialize the carousel when the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', () => {
    const featuredProjects = [
    {
        title: 'Project 1',
        description: 'Description for Project 1',
        imageURL: 'https://via.placeholder.com/900x300',
        projectURL: 'https://github.com/jonowood/Project-4-A-Team'
        },
        {
        title: 'Project 2',
        description: 'Description for Project 2',
        imageURL: 'https://via.placeholder.com/900x300',
        projectURL: 'https://github.com/jonowood/Project_3'
        },
        {
        title: 'Project 3',
        description: 'Description for Project 3',
        imageURL: 'Assets/images/webdesign-landing-page.jpg',
        projectURL: 'https://github.com/jonowood/Web-Design-Challenge'
        }
    ];
  
    const carouselInner = document.querySelector('#featured-projects .carousel-container');

    featuredProjects.forEach((project, index) => {
      const carouselItem = createCarouselItem(project, index);
      carouselInner.appendChild(carouselItem);
    });
  
    // Initialize the Bulma-Extensions carousel
    const carousel = document.querySelector('#featured-projects');
    if (carousel) {
      $(carousel).slick({
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        prevArrow: '.carousel-nav-left',
        nextArrow: '.carousel-nav-right',
        pauseOnHover: false,
        pauseOnFocus: false,
        draggable: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      });
    }
  });

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
  
  fetch('https://api.github.com/users/yourusername/repos')
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
  
  