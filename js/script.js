document.addEventListener("DOMContentLoaded", function () {
    let filterItems = document.querySelectorAll('.filter-item');
    let cardWrapper = document.querySelector('.card-wrapper');
    let viewSwitcherButtons = document.querySelectorAll('.view-switcher__button');

    // создаем блок с картинкой и текстом и подтягиваем данные из json файла
    fetch('images.json')
        .then(response => response.json())
        .then(data => {

            data.forEach(image => {
                let div = document.createElement('div');
                div.classList.add('card-item');

                let img = new Image();
                img.src = image.path;
                img.alt = image.alt;
                img.title = image.title;
                img.classList.add('card-img');
                div.appendChild(img);
                div.setAttribute('data-tags', image.tags);

                let text = document.createElement('p');
                text.classList.add('card-text');
                text.textContent = image.text;
                div.appendChild(text);

                cardWrapper.appendChild(div);

                // действия при наведении на картинку
                div.addEventListener('mouseover', () => {
                    img.style.filter = 'brightness(50%)';
                    img.style.transition = 'filter 0.3s ease-in-out';
                    text.style.opacity = 1;
                });

                div.addEventListener('mouseout', () => {
                    img.style.filter = 'brightness(100%)';
                    img.style.transition = 'filter 0.3s ease-in-out';
                    text.style.opacity = 0;
                });
            });
        })
        .catch(error => console.error(error));

    // работа кнопок с вариантами отображения
    viewSwitcherButtons.forEach(button => {
        button.addEventListener('click', () => {
            let selectedView = button.dataset.view;

            if (selectedView === 'six') {
                cardWrapper.style.columnCount = 6;
            } else if (selectedView === 'three') {
                cardWrapper.style.columnCount = 3;
            }

            viewSwitcherButtons.forEach(button => {
                button.classList.remove('active');
            });
            button.classList.add('active');
        });
    });


    // работа фильтров
    filterItems.forEach(filterItem => {
        filterItem.addEventListener('click', () => {
            let selectedTag = filterItem.dataset.tag;
            let cardItems = document.querySelectorAll('.card-item');

            cardItems.forEach(cardItem => {
                let tags = cardItem.dataset.tags.split(',');

                if (selectedTag === 'all' || tags.includes(selectedTag)) {
                    cardItem.style.display = 'block';
                } else {
                    cardItem.style.display = 'none';
                }
            });

            filterItems.forEach(item => {
                item.classList.remove('active');
            });
            filterItem.classList.add('active');
        });
    });
});

