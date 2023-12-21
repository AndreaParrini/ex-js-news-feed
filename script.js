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
    },
    {
        id: 5,
        title: 'Arte moderna: oltre i confini convenzionali',
        content: "Un'analisi delle tendenze e delle sfide nell'arte contemporanea, con interviste a artisti emergenti.",
        tags: ['cucina', 'serie tv'],
        author: 'Antonino Cannavacciulo',
        published: new Date('2023-05-2'),
        img: './images/modern-art.jpg'
    }
]

const colorsTag = [];
// richiamo la funzione per popolare l'array con il colore per ogni tag
listColorTag();

const sectionNewsEl = document.getElementById('section_news');
const sectionFilterEl = document.getElementById('filter_news');
const allSavedNews = []

generateCardNews(news, sectionNewsEl);
createOptionValue(sectionFilterEl);
savedNews();

controlSelect(sectionFilterEl);
controlCheckboxSaved()


/********************
 * FUNCTIONS
 ********************/

/**
 * Function to generate all card taht contain all news
 * @param {array} news array who contain news information
 * @param {DOMElement} sectionNewsEl dom element where insert all card
 */
function generateCardNews(news, sectionNewsEl) {

    news.forEach(element => {
        // creo il markup per ogni news
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
        //inserisco in html il marckup creato
        sectionNewsEl.insertAdjacentHTML('beforeend', newsMarkup)
        // richiamo la funzione per generare il box che contiene i tag
        createBoxTagNews(element.tags)
        // richiamo la funzione per colorare i tag
        colorTag();
    });
}

/**
 * function to create a box where insert tag
 * @param {array} tag property tag of news, array who contain all tags of news
 */
function createBoxTagNews(tag) {
    // creo l'elemento html div
    const boxTagEl = document.createElement('div')
    // aggiungo all'elemento la classe mt-3
    boxTagEl.classList.add('mt-3')

    // recupero tutti gli elementi html con classe card-body
    const cardEl = document.querySelectorAll('.card-body');
    // ciclo all'interno della lista che ho recuperato
    cardEl.forEach(card => {
        // per ogni elemento inserisco 
        card.insertAdjacentElement('beforeend', boxTagEl);
    })

    //richiamo la funzione per generare l'elemento tag
    generateTagEl(boxTagEl, tag);

}

/**
 * function to create tag
 * @param {element} boxTagEl DOM element where insert markup of tag
 * @param {array} tag 
 */
function generateTagEl(boxTagEl, tag) {
    // ciclo all'interno della lista che è stata passata contenente tutti i tag di una news
    tag.forEach(tag => {
        // creo l'elemento tag
        const tagEl = document.createElement('div')
        // aggiungo all'elemento le tre classi btn, me-1, text-light
        tagEl.classList.add('btn')
        tagEl.classList.add('me-1')
        tagEl.classList.add('text-light')
        // inserisco all'interno dell'elemento il testo del tag
        tagEl.innerHTML = tag;
        // aggiungo elemento al box che mi sono passato dalla funzione
        boxTagEl.insertAdjacentElement('beforeend', tagEl);
    });
}

/**
 * Function to creat a list of color for each news tag
 */
function listColorTag() {
    // recupero la lista contenente ogni tipologia di tag
    const listTag = filteredListTag(news)


    // ciclo all'interno della lista recuperata precedentemente contenente ogni singolo tag
    listTag.forEach((tag) => {
        // genero un colore random richiamando la funzione
        const color = generateRandomColor();
        // ceo un oggetto contenente nome del tag e il colore
        const object = {
            name: tag,
            color: color
        }
        // inserisco nell'array dei colori l'oggetto creato
        colorsTag.push(object)

    })

}

/**
 * function to modify background color of tag
 */
function colorTag() {

    // recupero tutti gli elementi html con class btn
    const allTag = document.querySelectorAll('.btn')
    // recupero la lista contenente ogni tipologia di tag
    const listTag = filteredListTag(news);

    // ciclo all'interno della lista recuperata precedentemente contenente ogni singolo tag
    listTag.forEach(tag => {
        // creo un array vuoto di appoggio
        const oneTypeTagEl = []
        // ciclo all'interno dell lista di elementi creata in precedenza 
        allTag.forEach(element => {
            // se il testo nell'elemento uguale al tipologia di tag allora inserisco nell'array l'elemento
            element.innerHTML === tag ? oneTypeTagEl.push(element) : ''
        })
        // ciclo all'interno dell'array contente ogni colore di ogni tipologia di tag
        colorsTag.forEach(color => {
            // se il nome del tag è uguale alla tipologia di tag
            if (color.name === tag) {
                // ciclo dentro l'array di appoggio 
                oneTypeTagEl.forEach(element => {
                    // e modififo lo style del background all'elemento
                    element.style.backgroundColor = color.color
                })
            }
        })
    })


}

/**
 * function to convert date
 * @param {Date} date the date to convert in DD-MM-YYYY
 * @returns formatted date
 */
function modifyFormatDate(date) {
    // prendo il mese il giorno e l'anno dalla data della news
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    const year = date.getFullYear();

    // se la lunghezza del mese e del giorno sono meno di 2 aggiungo uno 0 davanti
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    // concateno la nuova data
    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
}


/**
 * Function to create a list of a all single typeTag
 * @param {array} news array of all news
 * @returns return array that contain single tag
 */
function filteredListTag(news) {
    // creo un array contenente solo le proprietà tags
    const tagsList = news.map(element => element.tags)
    // creo un array alla quale inseriro ogni tipologia di tag
    const filteredTag = [];

    // ciclo nell'array che continene tutte le proprietà tags di ogni oggetto
    tagsList.forEach(newsTags => {
        // essendo degli array ci ciclo dentro per prendere il singolo valore di ognuna
        newsTags.forEach(newTag => {
            // se il singolo valore non è contenuto nell'array in cui ci saranno tutte le tipologie allora lo inserisco 
            !filteredTag.includes(newTag) ? filteredTag.push(newTag) : ''

        })

    })
    // restituisco l'arrai che contiene tutte le tipologie di tag
    return filteredTag;
}


/**
 * function to create option value and insert in html
 * @param {Element} filterEl DOM element where insert option value
 */
function createOptionValue(filterEl) {
    // recupero e lo salvo una variabile l'array contenente tutte le tipologie di tag
    const filteredTag = filteredListTag(news);
    // cilco al suo interno 
    filteredTag.forEach(tag => {
        // per ogni tag creo un markup
        const optionMarkup = `<option value="${tag}">${tag}</option>`
        // lo inserico nell'elemento della DOM che mi sono passato nella funzione
        filterEl.insertAdjacentHTML('beforeend', optionMarkup)
    });
}


/**
 * determinate the value of select
 * @returns the value of select
 */
function valueOfSelect() {
    const tagType = document.getElementById('filter_news').value;
    console.log(tagType);
    return tagType;
}

/**
 * funcion to create an array that contain only object selected
 * @param {array} news array that contain all news
 * @param {string} tagType the value of select
 * @returns the array that conatin only object selected
 */
function tagSelect(news, tagType) {
    if (tagType === 'allnews') {
        return news
    } else {
        const tagSelect = news.filter(tag => tag.tags.includes(tagType))
        return tagSelect
    }

}

/**
 * function to insert in html all news selected
 * @param {string} tagType the value of select
 * @param {array} selectedTag the array that contain all object of value selected
 */
function filteredTag(tagType, selectedTag) {
    // azzero l'elemento della DOM in cui inserire le news selezionate
    sectionNewsEl.innerHTML = "";
    // se c'è selezionato tutte le news, e clicco solo le notizie salvate e non ho niente 
    if (tagType === 'allnews' && savedNewsChecked() && selectedTag.length === 0) {
        // visualizzo questo
        sectionNewsEl.innerHTML = "No news saved";
    }
    else if (tagType === 'allnews') {
        generateCardNews(selectedTag, sectionNewsEl);
        savedNews();
    } else if (selectedTag.length != 0) {
        generateCardNews(selectedTag, sectionNewsEl)
        savedNews();
    } else if (savedNewsChecked() && selectedTag.length === 0) {
        sectionNewsEl.innerHTML = "No news saved";
    } else {
        sectionNewsEl.innerHTML = "No news available";
    }
}

/**
 * function to manage the change value of select filter news
 * @param {element} sectionFilterEl DOM element control the event change
 */
function controlSelect(sectionFilterEl) {
    sectionFilterEl.addEventListener('change', function () {
        // se il checkbox è flaggato e seleziono all news 
        if (savedNewsChecked() && valueOfSelect() === 'allnews') {
            // creo un array con tutte le notizie salvate
            const savedNews = news.filter(news => allSavedNews.includes(String(news.id)))
            // prendo gli oggetti con solo i tag selezionati dall'array delle notizie salvate
            const selectedTag = tagSelect(savedNews, valueOfSelect());
            // stampo in pagina l'array generato
            filteredTag(valueOfSelect(), selectedTag);
        } else if (savedNewsChecked()) {
            // invece se seleziono un altro valore dalla select e il check è flaggato, allora l'array lo creo con solo le notizie salvate di quel tag
            const savedNews = news.filter(news => news.tags.includes(valueOfSelect()) && allSavedNews.includes(String(news.id)))
            // prendo gli oggetti salvati e con i tag selezionati
            const selectedTag = tagSelect(savedNews, valueOfSelect());
            // stamp in pagina gli oggetti dell'array
            filteredTag(valueOfSelect(), selectedTag);
        } else {
            // altrimenti se non è flaggato il checkbox prendo tutte le news del valore selezionato
            const selectedTag = tagSelect(news, valueOfSelect());
            // stamp in pagina gli oggetti dell'array
            filteredTag(valueOfSelect(), selectedTag);
        }
    })
}

/**
 * Function to control the cahng value of checkbox saved news
 */
function controlCheckboxSaved(){
    document.getElementById('saved_news').addEventListener('change', function () {
        // se flaggato 
        if (savedNewsChecked()) {
            // filtro tutte le notizie e creo un array con solo quelle salvate
            const savedNews = news.filter(newsId => {
                // ciclo nell'array di tutte le notizie salvate, quando trovo un id uguale lo metto nel nuovo array
                if (allSavedNews.includes(String(newsId.id))) {
                    return true
                }
            })
            // azzero l'html
            sectionNewsEl.innerHTML = ""
            // creo un array con solo gli oggetti salvati
            const selectedTag = tagSelect(savedNews, valueOfSelect());
            // stampo in pagina l'array
            filteredTag(valueOfSelect(), selectedTag);
        } else {
            sectionNewsEl.innerHTML = ""
            const selectedTag = tagSelect(news, valueOfSelect());
            filteredTag(valueOfSelect(), selectedTag);
            savedNews();
        }

    })
}



/**
 * function to generate markup of icon. determinate if icon saved or not
 * @param {string} id the id of news 
 * @returns the markup of icon
 */
function generateIcon(id) {
    // generazione delle icon se l'id è presente nell'array delle icone salvate allora lo stampo con l'icona solid altrimenti regular
    if (allSavedNews.includes(String(id))) {
        const iconMarkup = `<i class="fa-solid fa-bookmark fa-xl" data-id-news="${id}"></i>`
        return iconMarkup
    } else {
        const iconMarkup = `<i class="fa-regular fa-bookmark fa-xl" data-id-news="${id}"></i>`
        return iconMarkup
    }

}


/**
 * function to saved all icon 
 * @returns list of all icon
 */
function selectAllIcon() {
    const allIcon = document.querySelectorAll('i');
    return allIcon
}

/**
 * function to activate the event listener on all icon 
 */
function savedNews() {
    const allIcon = selectAllIcon();
    allIcon.forEach(icon => {
        icon.addEventListener('click', function () {
            icon.classList.remove('fa-regular')
            icon.classList.add('fa-solid')
            allSavedNews.push(icon.getAttribute('data-id-news'))
        })

    })
}


/**
 * function to generate a random color 
 * @returns a string of color
 */
function generateRandomColor() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const color = "#" + randomColor;
    return color;
}

/**
 * @returns function to determinate if checkbox is checked or not
 */
function savedNewsChecked() {
    if (document.getElementById('saved_news').checked) {
        return true
    }
}
