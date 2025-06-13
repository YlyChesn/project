function showContent() {
    const preloaderElement = document.getElementById('preloader');
    const contentElement = document.getElementById('content');

    if (!preloaderElement || !contentElement) {
        console.error('Ошибка: Не найдены элементы прелоадера или контента');
        return;
    }

    setTimeout(() => {
        preloaderElement.style.opacity = '0';
        setTimeout(() => {
            preloaderElement.style.display = 'none';
            contentElement.style.display = 'block';
            setTimeout(() => {
                contentElement.style.opacity = '1';
                console.log('Контент отображён');
                if (window.getComputedStyle(contentElement).display === 'none') {
                    console.error('Ошибка: Контент всё ещё скрыт, проверьте CSS');
                }
            }, 50);
        }, 500);
    }, 3000);
}

function handleLinksClick() {
    const links = document.querySelectorAll('.links-link');

    if (links.length === 0) {
        console.error('Ошибка: Ссылки навигации не найдены');
        return;
    }

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            links.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            console.log(`Выбран пункт навигации: ${this.dataset.page}`);
        });
    });
}

function initSwiper() {
    if (!window.Swiper) {
        console.error('Ошибка: Swiper не загружен');
        return;
    }

    const swiperContainer = document.querySelector('.cards__carousel');
    if (!swiperContainer) {
        console.error('Ошибка: Контейнер карусели (.cards__carousel) не найден');
        return;
    }

    const prevButton = swiperContainer.querySelector('.swiper-button-prev');
    const nextButton = swiperContainer.querySelector('.swiper-button-next');
    const pagination = swiperContainer.querySelector('.swiper-pagination');
    console.log('Кнопки навигации:', { prevButton: !!prevButton, nextButton: !!nextButton, pagination: !!pagination });

    const swiper = new Swiper('.cards__carousel', {
        slidesPerView: 2,
        spaceBetween: 20,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            1200: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 1,
            }
        }
    });

    console.log('Swiper инициализирован:', swiper);

    if (prevButton) {
        prevButton.addEventListener('click', () => console.log('Нажата кнопка "Назад"'));
    }
    if (nextButton) {
        nextButton.addEventListener('click', () => console.log('Нажата кнопка "Вперёд"'));
    }
}

function handleCardClick() {
    const cards = document.querySelectorAll('.card');

    if (cards.length === 0) {
        console.error('Ошибка: Карточки не найдены');
        return;
    }

    cards.forEach(card => {
        card.addEventListener('click', function() {
            cards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            console.log(`Выбрана карточка: ${this.dataset.section}`);
        });

        card.addEventListener('mouseover', function() {
            console.log(`Наведение на карточку: ${this.dataset.section}`);
        });
    });
}

function handleSearchForm() {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    if (!searchForm || !searchInput) {
        console.error('Ошибка: Форма или поле поиска не найдены');
        return;
    }

    const savedSearch = localStorage.getItem('searchQuery');
    if (savedSearch) {
        searchInput.value = savedSearch;
        console.log('Восстановлен поисковый запрос:', savedSearch);
    }

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
            localStorage.setItem('searchQuery', query);
            console.log('Поисковый запрос сохранён:', query);
            alert(`Поиск: ${query}`);
        } else {
            console.warn('Поисковый запрос пустой');
        }
    });
}

function loadArticles(filterCategory = 'all') {
    const articlesList = document.getElementById('articles-list');

    if (!articlesList) {
        console.error('Ошибка: Список статей не найден');
        return;
    }

    const articlesData = [
        { id: 'east', title: 'Цивилизации Древнего Востока', category: 'ancient' },
        { id: 'philosophy', title: 'Древняя философия', category: 'ancient' },
        { id: 'rome', title: 'Римская империя', category: 'ancient' },
        { id: 'greece', title: 'Искусство Древней Греции', category: 'ancient' },
        { id: 'byzantine', title: 'Византийская империя', category: 'medieval' },
        { id: 'crusades', title: 'Крестовые походы', category: 'medieval' },
        { id: 'renaissance', title: 'Ренессанс', category: 'modern' },
        { id: 'discoveries', title: 'Великие географические открытия', category: 'modern' },
        { id: 'french-revolution', title: 'Французская революция', category: 'modern' },
        { id: 'industrial-revolution', title: 'Промышленная революция', category: 'classic' },
    ];

    articlesList.innerHTML = '';

    articlesData.forEach(article => {
        if (filterCategory === 'all' || article.category === filterCategory) {
            const listItem = document.createElement('li');
            listItem.classList.add('articles__item');
            const link = document.createElement('a');
            link.href = '#';
            link.classList.add('articles__link');
            link.dataset.article = article.id;
            link.textContent = article.title;
            listItem.appendChild(link);
            articlesList.appendChild(listItem);
        }
    });

    console.log(`Список статей загружен с фильтром: ${filterCategory}`);
}

function filterArticles() {
    const filterButtons = document.querySelectorAll('.articles__filter-button');

    if (filterButtons.length === 0) {
        console.error('Ошибка: Кнопки фильтрации не найдены');
        return;
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const selectedCategory = this.dataset.filter;

            if (!['all', 'ancient', 'medieval', 'modern', 'classic'].includes(selectedCategory)) {
                console.error('Ошибка: Неверная категория фильтра');
                return;
            }

            loadArticles(selectedCategory);
            console.log(`Применён фильтр: ${selectedCategory}`);
        });
    });
}

function handleArticleClick() {
    const articlesList = document.getElementById('articles-list');

    if (!articlesList) {
        console.error('Ошибка: Список статей не найден');
        return;
    }

    articlesList.addEventListener('click', event => {
        if (event.target.classList.contains('articles__link')) {
            event.preventDefault();
            console.log(`Выбрана статья: ${event.target.dataset.article}`);
        }
    });
}

function loadCardTitles() {
    const titlesList = document.getElementById('titles-list');

    if (!titlesList) {
        console.error('Ошибка: Список заголовков не найден');
        return;
    }

    const titleElements = document.querySelectorAll('.card__title');

    if (titleElements.length === 0) {
        console.error('Ошибка: Заголовки карточек не найдены');
        return;
    }

    const cardTitles = Array.from(titleElements).map(element => element.textContent);
    titlesList.innerHTML = '';

    cardTitles.forEach(title => {
        const listItem = document.createElement('li');
        listItem.classList.add('card-titles__item');
        listItem.textContent = title;
        titlesList.appendChild(listItem);
    });

    console.log('Заголовки карточек загружены:', cardTitles);
}

async function fetchCardsData() {
    try {
        const response = await fetch('data/data.json');
        if (!response.ok) {
            throw new Error(`Ошибка загрузки JSON: ${response.status}`);
        }
        const data = await response.json();
        console.log('Данные из JSON загружены:', data);
        return data;
    } catch (error) {
        console.error('Ошибка при загрузке JSON:', error);
        return null;
    }
}

async function renderDynamicCards() {
    const dynamicCardsContainer = document.getElementById('dynamic-cards');

    if (!dynamicCardsContainer) {
        console.error('Ошибка: Контейнер для динамических карточек не найден');
        return;
    }

    const cardsData = await fetchCardsData();
    if (!cardsData) {
        console.error('Ошибка: Данные карточек не загружены');
        return;
    }

    const titleElement = document.createElement('h3');
    titleElement.classList.add('dynamic-cards__title');
    titleElement.textContent = 'Список разделов';
    const listElement = document.createElement('ul');
    listElement.classList.add('dynamic-cards__list');

    for (let cardId in cardsData) {
        const itemElement = document.createElement('li');
        itemElement.classList.add('dynamic-cards__item');

        const title = document.createElement('div');
        title.classList.add('dynamic-cards__item-title');
        title.textContent = cardsData[cardId].title;

        const description = document.createElement('p');
        description.classList.add('dynamic-cards__item-description');
        description.textContent = cardsData[cardId].description;

        itemElement.appendChild(title);
        itemElement.appendChild(description);
        listElement.appendChild(itemElement);
    }

    dynamicCardsContainer.appendChild(titleElement);
    dynamicCardsContainer.appendChild(listElement);
    console.log('Динамический блок карточек выведен');
}

function handleScrollTop() {
    const scrollTopButton = document.getElementById('scroll-top');

    if (!scrollTopButton) {
        console.error('Ошибка: Кнопка скролла не найдена');
        return;
    }

    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        console.log('Скролл к началу страницы');
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopButton.classList.add('visible');
        } else {
            scrollTopButton.classList.remove('visible');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    showContent();
    handleLinksClick();
    initSwiper();
    handleCardClick();
    handleSearchForm();
    loadArticles();
    filterArticles();
    handleArticleClick();
    loadCardTitles();
    renderDynamicCards();
    handleScrollTop();
});