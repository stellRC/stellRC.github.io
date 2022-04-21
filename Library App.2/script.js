const endpoint = 'https://raw.githubusercontent.com/benoitvallon/100-best-books/master/books.json';

const bookName = [];

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => bookName.push(...data));
console.log(endpoint)
console.log(bookName)


function findMatches(wordToMatch, bookName) {
return bookName.filter(results => {
    const regex = new RegExp(wordToMatch, 'gi')
    return results.title.match(regex) 
})
}

function numberWithCommas(x) {
return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches() {
const matchArray = findMatches(this.value, bookName)
const html = matchArray.map(results => {
    const regex = new RegExp(this.value, 'gi');
    const bookTitle = results.title.replace(regex, `<span class="hl">${this.value}</span>`)
    return `
    <ul class="suggestion--list">
        <input type="text" name="title" placeholder="Title" value="${results.title}" readonly>
        <input type="text" name="author" placeholder="Title" value="${results.author}" readonly>
        <input type="text" name="pages" placeholder="Title" value="${results.pages}" readonly>
        <img src="https://github.com/stellRC/100-best-books/tree/master/static/images/${results.imageLink}" alt="">
    </ul>
    `
}).join('');
suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches)
searchInput.addEventListener('keyup', displayMatches)

 // <input type="submit" class="book__suggested--submit">
//       // <li>
        //     <button class="btn book__suggested--submit">Submit</button>
        // </li>

// Not API


const addBtn = document.querySelector('.btn--add')
const removeCard = document.querySelector('.btn--remove')
const deleteBtn = document.querySelector('.btn--delete')

const switchToggle = document.querySelector('.checkbox')
const switchToggled = document.querySelector('input[type="checkbox"]:checked')

const bookLibrary = document.querySelector('.container__books')
const card = document.querySelector('.card')
const submitNew = document.querySelector('.book--submit')
const submitSuggestedButtons = document.querySelectorAll('.book__suggested--submit')
const suggestionList = document.querySelector('.suggestions')
const popUp = document.querySelector('.pop-up')
const popUpForm = document.querySelector('.pop-up--form')
const bookCard = document.getElementById('newBookCard')
const cardContent = document.querySelector('card__content')

const containerNav = document.querySelector('.container--nav')

const countAll = document.getElementById('countAll')
const countFinished = document.getElementById('countFinished')
const countCurrent = document.getElementById('countCurrent')
const countWant = document.getElementById('countWant')

const suggestedSearch = document.querySelector('.suggested--search')
const resetForm = document.querySelector('.reset--form')

const book = new Book()



function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.info = function() {
        return (title + author + ", " + pages + ", " + status);
    }  
}


function newBook() {
    book.title = newBookCard.title.value;
    book.author = newBookCard.author.value;
    book.pages = newBookCard.pages.value;
}

let val;

function getRadioVal(newBookCard, status) {
    let radios = newBookCard.elements[status];
    
    for (let i=0, len=radios.length; i<len; i++) {
        if ( radios[i].checked ) { 
            val = radios[i].value; 
            break; 
        }
    }
    return val; 
}

bookCard.addEventListener('click', function()  {
    let val = getRadioVal(this, 'status');
    book.status = val;
});

submitNew.addEventListener('click', function() {
    if (val === "Want To Read") {
       countWant.value++;
       countAll.value++;
       console.log(countWant.value)
    } else if (val === "Current") {
        countCurrent.value++;
        countAll.value++;
    } else if (val === "Finished") {
        countFinished.value++;
        countAll.value++;
    }
})

function addBookToLibrary() {
   
    popUp.classList.toggle('removeBtn')
   
    book.title = newBookCard.title.value;
    book.author = newBookCard.author.value;
    book.pages = newBookCard.pages.value;


  
    let newCard = document.createElement('ul');
    newCard.className = 'card';

    let newTitle = document.createElement('li');
    newTitle.className = 'card--title';
    newTitle.innerHTML = book.title;

    let newAuthor = document.createElement('li')
    newAuthor.className = 'author'
    newAuthor.innerHTML = book.author;

    let newPages = document.createElement('li')
    newPages.className = 'pages'
    newPages.innerHTML = book.pages;

    let newRead = document.createElement('li')
    newRead.className = 'read'
    newRead.innerHTML = book.status;
    
    let newRemove = document.createElement('li')
    newRemove.className = 'remove'

    let newBtnRemove = document.createElement('button');
    newBtnRemove.className = 'btn btn--remove';

    let newBtnEdit = document.createElement('button');
    newBtnEdit.className = 'btn btn--edit';

    newCard.appendChild(newTitle)
    newCard.appendChild(newAuthor);
    newCard.appendChild(newPages);
    newCard.appendChild(newRead);
    newCard.appendChild(newRemove);
    newRemove.appendChild(newBtnRemove);
    newRemove.appendChild(newBtnEdit);
    bookLibrary.appendChild(newCard);
}

function closeSearch() {
  suggestions.classList.toggle('removeBtn')
   console.log(this)
   console.log(suggestionList)
}


function createBook() {
    popUp.classList.toggle('removeBtn');
    popUpForm.reset();
}

function changeDisplay() {
    bookLibrary.classList.toggle('change--display')
}

// Use bubbling event listeners for dynamically created elements

bookLibrary.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn--remove')) {
                e.target.parentElement.parentElement.classList.add('removeBtn')

                if ( e.target.parentElement.previousElementSibling.innerHTML === "Want To Read") {
                    countWant.value--;
                    countAll.value--;
                    console.log(countWant.value)
                 } else if ( e.target.parentElement.previousElementSibling.innerHTML === "Current") {
                     countCurrent.value--;
                     countAll.value--;
                 } else if ( e.target.parentElement.previousElementSibling.innerHTML === "Finished") {
                     countFinished.value--;
                     countAll.value--;
                 }
            }
            if (e.target.classList.contains('btn--edit')) {
                e.target.parentElement.parentElement.classList.add('removeBtn')
                popUp.classList.toggle('removeBtn')
                if ( e.target.parentElement.previousElementSibling.innerHTML === "Want To Read") {
                    countWant.value--;
                    countAll.value--;
                    console.log(countWant.value)
                 } else if ( e.target.parentElement.previousElementSibling.innerHTML === "Current") {
                     countCurrent.value--;
                     countAll.value--;
                 } else if ( e.target.parentElement.previousElementSibling.innerHTML === "Finished") {
                     countFinished.value--;
                     countAll.value--;
                 }

            }
});

submitNew.addEventListener('click', addBookToLibrary)
addBtn.addEventListener('click', createBook)
switchToggle.addEventListener('click', changeDisplay)

// submitSuggestedButtons.forEach(submitSuggestedButton =>submitSuggestedButton.addEventListener('click', function() {
//     e.prev
//     console.log(suggestedBook.title.value)
// ))}



suggestedSearch.addEventListener('search', closeSearch)

// submitSuggestedButtons.addEventListener('click', addSuggestedBookToLibrary)