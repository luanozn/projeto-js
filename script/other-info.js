const API_KEY = '01a196b25c6f4177a52b0912ecb51a19'; // Coloque sua chave de API válida da NewsAPI aqui

// Variáveis globais
let currentSlide = 0;
let totalSlides = 0;

// Função para obter notícias da API
async function getNews(country) {
  const url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.log('Erro ao obter notícias:', error);
    return [];
  }
}

// Função para criar os slides de notícias
function createSlides(articles) {
  const slider = document.querySelector('.slider');

  // Limpar os slides existentes
  slider.innerHTML = '';

  // Criar um slide para cada notícia
  articles.forEach((article, index) => {
    const slide = document.createElement('div');
    slide.classList.add('slide');

    if (index === currentSlide) {
      slide.classList.add('active');
    }

    const image = document.createElement('img');
    image.src = article.urlToImage || 'images/image-not-found.png';

    const slideContent = document.createElement('div');
    slideContent.classList.add('slide-content');

    const title = document.createElement('h3');
    title.textContent = article.title;

    const description = document.createElement('p');
    description.textContent = article.description;

    slideContent.appendChild(title);
    slideContent.appendChild(description);

    slide.appendChild(image);
    slide.appendChild(slideContent);

    slider.appendChild(slide);
  });

  // Atualizar o número total de slides
  totalSlides = articles.length;
}

// Função para exibir o slide atual
function showSlide() {
  const slides = document.querySelectorAll('.slide');

  slides.forEach((slide, index) => {
    if (index === currentSlide) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });
}

// Função para avançar para o próximo slide
function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide();
}

// Função para voltar para o slide anterior
function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide();
}

// Função principal
async function main() {
  const countrySelect = document.getElementById('country-select');
  const prevButton = document.getElementById('prev-button');
  const nextButton = document.getElementById('next-button');

  // Event listener para o botão de próximo slide
  nextButton.addEventListener('click', nextSlide);

  // Event listener para o botão de slide anterior
  prevButton.addEventListener('click', prevSlide);

  // Event listener para selecionar um país no dropdown
  countrySelect.addEventListener('change', async (event) => {
    const selectedOption = countrySelect.options[countrySelect.selectedIndex];
    const selectedCountry = selectedOption.dataset.value;
    const articles = await getNews(selectedCountry);

    if (articles.length > 0) {
      createSlides(articles);
      showSlide();
    }
  });
}

// Executar a função principal quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', main);
