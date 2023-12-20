const news = [
    {
        id: 1,
        title: 'Scoperta di una nuova specie di papera di gomma',
        content: 'Scoperta di una nuova specie di papera di gomma.',
        tags: ['geo', 'tech'],
        author: 'Diana Rossi',
        published: new Date('2023-02-11'),
        img: './images/rubber-duck.jpg'
    },
    {
        id: 2,
        title: 'Esplorando le profondità marine: il mistero degli abissi',
        content: 'Esplorando le profondità marine: il mistero degli abissi',
        tags: ['geo', 'viaggi'],
        author: 'Fabio Mari',
        published: new Date('2023-03-14'),
        img: './images/kitchen-food.jpg'
    },
    {
        id: 3,
        title: 'Viaggio culinario: alla ricerca dei sapori perduti',
        content: 'Esplorazione di tradizioni culinarie dimenticate e la ricerca di sapori autentici.',
        tags: ['cucina'],
        author: 'Marta Bianchi',
        published: new Date('2023-04-20'),
        img: './images/deep-sea.jpg'
    },
    {
        id: 4,
        title: 'Arte moderna: oltre i confini convenzionali',
        content: "Un'analisi delle tendenze e delle sfide nell'arte contemporanea, con interviste a artisti emergenti.",
        tags: ['arte', 'tech'],
        author: 'Gabriele Neri',
        published: new Date('2023-05-2'),
        img: './images/modern-art.jpg'
    }
]
console.log(news);


const sectionNewsEl = document.getElementById('section_news');
const sectionFilterEl = document.getElementById('filter_news');
const allSavedNews = []

generateCardNews(news, sectionNewsEl);
createOptionValue(sectionFilterEl);
savedNews();


/**
 * Function to generate all card taht contain all news
 * @param {array} news array who contain news information
 * @param {DOMElement} sectionNewsEl dom element where insert all card
 */
function generateCardNews(news, sectionNewsEl) {

    news.forEach(element => {
        const newsMarkup =
            `
            <div class="card rounded-0 my-3">
                <div class="card-body">
                    <div class="d-flex align-items-start gap-5 justify-content-between">
                    <div>
                        <h3 class="card-title mb-0">${element.title}</h3>
                    </div>
                    <div>
                        ${generateIcon(element.id)}
                    </div>
                    </div>
                    <div>pubblicato da ${element.author}</div>
                    <div>in data ${modifyFormatDate(element.published)}</div>
                    <p class="card-text mt-3">${element.content}</p>
                    <img class="w-100" src="${element.img}" alt="${element.title}" srcset="">
                </div>
            </div>
            `
        sectionNewsEl.insertAdjacentHTML('beforeend', newsMarkup)
        createBoxTagNews(element.tags)
    });
}

/**
 * function to create a box where insere tag
 * @param {array} tag property tag of news, array who contain all tags of news
 */
function createBoxTagNews(tag) {
    const boxTagEl = document.createElement('div')
    boxTagEl.classList.add('mt-3')

    generateTagEl(boxTagEl, tag);

    const cardEl = document.querySelectorAll('.card-body');
    cardEl.forEach(card => {
        card.insertAdjacentElement('beforeend', boxTagEl);
    })
}

/**
 * function to create tag
 * @param {element} boxTagEl DOM element where insert markup of tag
 * @param {array} tag 
 */
function generateTagEl(boxTagEl, tag) {
    tag.forEach(tag => {
        const tagEl = document.createElement('div')
        tagEl.classList.add('btn')
        tagEl.classList.add('me-1')
        tagEl.classList.add('text-light')
        colorTag(tagEl, tag);
        tagEl.innerHTML = tag;
        boxTagEl.insertAdjacentElement('beforeend', tagEl);
    });
}

/**
 * function to modify background color of tag
 * @param {element} tagEl insert element that modify style
 * @param {*} tag 
 */
function colorTag(tagEl, tag) {

    if (tag === 'viaggi') {
        tagEl.style.backgroundColor = 'red';
    } else if (tag === 'geo') {
        tagEl.style.backgroundColor = 'orange';
    } else if (tag === 'tech') {
        tagEl.style.backgroundColor = 'blue';
    } else if (tag === 'cucina') {
        tagEl.style.backgroundColor = 'purple';
    } else if (tag === 'arte') {
        tagEl.style.backgroundColor = 'green';
    }
}

/**
 * function to convert date
 * @param {Date} date the date to convert in DD-MM-YYYY
 * @returns formatted date
 */
function modifyFormatDate(date) {
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    const year = date.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    const formattedDate = `${day}-${month}-${year}`;
    console.log(formattedDate);

    return formattedDate;
}


/**
 * Function to create a list of a all single typeTag
 * @param {array} news array of all news
 * @returns return array that contain single tag
 */
function filteredListTag(news) {
    const tagsList = news.map(element => element.tags)
    console.log(tagsList);

    const filteredTag = [];

    tagsList.forEach(newsTags => {
        console.log(newsTags);
        newsTags.forEach(newTag => {

            !filteredTag.includes(newTag) ? filteredTag.push(newTag) : ''

        })

    })
    return filteredTag;
}


/**
 * function to create option value and insert in html
 * @param {Element} filterEl DOM element where insert option value
 */
function createOptionValue(filterEl) {
    const filteredTag = filteredListTag(news);
    filteredTag.forEach(tag => {
        const optionMarkup = `<option value="${tag}">${tag}</option>`
        filterEl.insertAdjacentHTML('beforeend', optionMarkup)
    });
}

/**
 * funcion to create an array that contain only object selected
 * @param {array} news array that contain all news
 * @param {string} tagType the value of select
 * @returns the array that conatin only object selected
 */
function tagSelect(news, tagType){
    if (tagType === 'allnews') {
        return news
    }else{
        const tagSelect = news.filter(tag => tag.tags.includes(tagType))
        return tagSelect    
    }
    
}

/**
 * function to insert in html all news selected
 * @param {string} tagType the value of select
 * @param {array} selectedTag the array that contain all object of value selected
 */
function filteredTag(tagType, selectedTag){
    sectionNewsEl.innerHTML = "";

    if (tagType === 'allnews') {
        generateCardNews(selectedTag, sectionNewsEl);
        savedNews();
    } else if (selectedTag.length != 0) {
        generateCardNews(selectedTag, sectionNewsEl)
        savedNews();
    } else {
        sectionNewsEl.innerHTML = "No news available";
    }
}

/**
 * determinate the value of select
 * @returns the value of select
 */
function valueOfSelect(){
    const tagType = document.getElementById('filter_news').value;
    console.log(tagType);
    return tagType;
}

sectionFilterEl.addEventListener('change', function () {

    const selectedTag = tagSelect(news, valueOfSelect());
    filteredTag(valueOfSelect(), selectedTag);
    
})



document.getElementById('saved_news').addEventListener('change', function () {
    console.log(this.checked);
    if (this.checked) {
        const savedNews = news.filter(newsId => {
            console.log(allSavedNews, String(newsId.id));
            if (allSavedNews.includes(String(newsId.id))) {
                return true
            }
        })
        console.log(savedNews);
        sectionNewsEl.innerHTML = ""
        const selectedTag = tagSelect(savedNews, valueOfSelect());
        filteredTag(valueOfSelect(), selectedTag);
    }else 
        {
            sectionNewsEl.innerHTML = ""
            const selectedTag = tagSelect(news, valueOfSelect());
            filteredTag(valueOfSelect(), selectedTag);
            savedNews();
        }

})



/**
 * function to generate markup of icon. determinate if icon saved or not
 * @param {string} id the id of news 
 * @returns the markup of icon
 */
function generateIcon(id){

    if(allSavedNews.includes(String(id))){
        const iconMarkup = `<i class="fa-solid fa-bookmark fa-xl" data-id-news="${id}"></i>`
        return iconMarkup
    } else{
       const iconMarkup = `<i class="fa-regular fa-bookmark fa-xl" data-id-news="${id}"></i>`
       return iconMarkup
    }

}


/**
 * function to saved all icon 
 * @returns list of all icon
 */
function selectAllIcon(){
    const allIcon = document.querySelectorAll('i');
    console.log(allIcon);
    return allIcon
}

/**
 * function to activate the event listener on icon 
 */
function savedNews(){
    const allIcon = selectAllIcon();
    allIcon.forEach(icon => {
        console.log(icon.classList);
        icon.addEventListener('click', function () {
            icon.classList.remove('fa-regular')
            icon.classList.add('fa-solid')
            allSavedNews.push(icon.getAttribute('data-id-news'))
            console.log(allSavedNews);
        })
    
    })
}
