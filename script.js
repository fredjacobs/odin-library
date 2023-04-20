
let myLibrary = [];
const bookList = document.querySelector('.display-books-container');
const modal = document.getElementById('bookEntryModal');
const span = document.getElementsByClassName('close')[0];
const newBtn = document.querySelector('.addNewBook');
const submitBtn = document.getElementById('submit-btn');



function Book(title, author,
    pages, read){
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
        
    }


    Book.prototype = {
        info: function(){
            return `${this.title} was written by ${this.author} and has ${this.pages}, 
            ${this.read === true ? 'already read' : 'not read yet' }`
        }
    }

    function addBook(title, author, pages, read){
        let newBook = new Book(title, author, pages, read);
        myLibrary.push(newBook);

        displayBook(newBook);

    }

    function displayBook(book){
        

            const html = `
        <div class="book-card" data-book="${book.title}">
            <p class="book-title">${book.title}</p>
            <p class="book-author">${book.author}</p>
            <p class="book-pages">${book.pages}</p>
            <p class="book-has-read">${book.read}</p>
            <button class="toggle-read">Toggle Read</button>
            <button class="delete-book">Delete</button>
        </div>
        `

        bookList.insertAdjacentHTML("afterbegin", html);

        
        

        
    }

    function getBookInfo(){
        let title = document.getElementById('book-name');
        let author = document.getElementById('book-author');
        let pages = document.getElementById('page-number');
        let read = document.getElementsByName('book-read');
        let didRead;

        for (let option of read){
            if(option.checked){
                didRead = option.value;
            }
            option.checked = false;
        }

        addBook(title.value, author.value, pages.value, didRead);

        title.value = '';
        author.value = '';
        pages.value = '';

        modal.style.display = 'none';
        
    }

    function deleteBook(e){
        console.log(e.target);
    }

    

    
    submitBtn.addEventListener('click', getBookInfo);
    
    bookList.addEventListener('click', function(e){
        const targetEl = e.target.closest('.book-card');
        const book = targetEl.dataset.book;

        if(e.target.classList.contains('delete-book')){
            myLibrary.find((el, i) => {if(el.title === book ) myLibrary.pop(el)})
            targetEl.remove();
        }else if((e.target.classList.contains('toggle-read'))){
            
            console.log(`Must Toggle`);
            
            myLibrary.find((el, i) => {if(el.read === 'yes'){
                el.read = 'no'
                e.target.previousElementSibling.textContent = 'no'
            } else {
                el.read = 'yes'
                e.target.previousElementSibling.textContent = 'yes'
            }})
            
        }
        
        
        console.log(e.target);
    })
    
    console.log(myLibrary);



    

    /* const book = document.getElementById('book-name');
    book.dataset.bookName = 'BookInPlace'; */

newBtn.onclick = function(){
    modal.style.display = 'block';
}

span.onclick = function(){
    modal.style.display = 'none';
}

window.onclick = function(event){
    if(event.target == modal){
        modal.style.display = 'none';
    }
}

    