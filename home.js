document.addEventListener('DOMContentLoaded', ()=>{
    const coutform = document.querySelector('#coutform')
    const cinform = document.querySelector('#cinform')
    const addform = document.querySelector('#addform');
    const removeform = document.querySelector('#removeform');
    const tcount = document.querySelector('.total-books')
    const acount = document.querySelector('.avail-books')
    const ccount = document.querySelector('.check-out-books')
    const booksDiv = document.querySelector('.books-div');
    const cinSuccess = document.querySelector('.check-in-success');
    const coutSuccess = document.querySelector('.check-out-success');
    const cinFailed = document.querySelector('.check-in-failed');
    const coutFailed = document.querySelector('.check-out-failed');
    const addSuccess = document.querySelector('.add-success');
    const removeSuccess = document.querySelector('.remove-success');
    const addFailed = document.querySelector('.add-failed');
    const removeFailed = document.querySelector('.remove-failed');

    const dashboard = document.querySelector('#dashboard-container');
    const cincout = document.querySelector('#cin-cout-container');
    const books = document.querySelector('#books-container');
    const admin = document.querySelector('#admin-container');

    function display_dashboard(){
        dashboard.style.display = 'block';
        admin.style.display = 'none';
        books.style.display = 'none';
        cincout.style.display = 'none';
    }

    function display_books(){
        dashboard.style.display = 'none';
        admin.style.display = 'none';
        books.style.display = 'block';
        cincout.style.display = 'none';
    }
    function display_admin(){
        dashboard.style.display = 'none';
        admin.style.display = 'block';
        books.style.display = 'none';
        cincout.style.display = 'none';
    }
    function display_cincout(){
        dashboard.style.display = 'none';
        admin.style.display = 'none';
        books.style.display = 'none';
        cincout.style.display = 'block';
    }


    document.querySelector('#dashboard-link').addEventListener('click', display_dashboard);
    document.querySelector('#books-link').addEventListener('click', display_books);
    document.querySelector('#admin-link').addEventListener('click', display_admin);
    document.querySelector('#cincout-link').addEventListener('click', display_cincout)


    var bookDetails = [
        {
            bid: '1001',
            pname: 'Penguin Books',
            lang: 'English',
            aname: 'George Orwell',
            bname: '1984',
            status: 'available',
            count: 10,
            acount: 10
          },
          {
            bid: '1002',
            pname: 'HarperCollins',
            lang: 'Spanish',
            aname: 'Gabriel García Márquez',
            bname: 'One Hundred Years of Solitude',
            subject: 'Magic Realism',
            status: 'available',
            count: 20,
            acount: 20
          },
          {
            bid: '1003',
            pname: 'Random House',
            lang: 'French',
            aname: 'Albert Camus',
            bname: 'The Stranger',
            subject: 'Existentialism',
            status: 'available',
            count: 30,
            acount: 30
          },
          {
            bid: '1004',
            pname: 'Simon & Schuster',
            lang: 'German',
            aname: 'Hermann Hesse',
            bname: 'Siddhartha',
            subject: 'Spirituality',
            status: 'available',
            count: 10,
            acount: 10
          },
          {
            bid: '1005',
            pname: 'Vintage Books',
            lang: 'Italian',
            aname: 'Dante Alighieri',
            bname: 'The Divine Comedy',
            subject: 'Epic Poetry',
            status: 'available',
            count: 15,
            acount: 15
          }
    ];

    var TotalBooks = 0;
    var AvailableBooks = 0;
    var CheckOutBooks = 0;

    function update_count(){
        for(let book of bookDetails){
            TotalBooks = TotalBooks + book.count;
            AvailableBooks = AvailableBooks + book.acount;
        }
    }

    update_count()

    tcount.innerHTML = TotalBooks;
    acount.innerHTML = AvailableBooks;
    ccount.innerHTML = CheckOutBooks;


    var count = 1;
    function update_books(){
        booksDiv.innerHTML = "";
        bookDetails.forEach((book) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.style.width = '20rem';

            // Create the card content
            card.innerHTML = `
                <div class="card-body">
                    <p></p>
                    <h5 class="card-title bname">Name Of the book: ${book.bname}</h5>
                    <p class="card-text bid">Book ID: ${book.bid}</p>
                    <p class="card-text aname">Author name: ${book.aname}</p>
                    <p class="card-text lang">Language: ${book.lang}</p>
                    <p class="card-text count">No of books: ${book.acount}</p>
                </div>
            `;
            count ++;
            // Append the card to the booksDiv
            booksDiv.appendChild(card);
        });
    }
    update_books()

    coutform.onsubmit = function(event){
        event.preventDefault();
        console.log("submitted");
        for(let book of bookDetails){
            if(book.acount >= Number(coutform.elements.count.value)
                && book.status == "available" 
                && book.bid == coutform.elements.lname.value
            ){

                book.acount = book.acount - coutform.elements.count.value;

                AvailableBooks = 0;
                TotalBooks = 0;
                update_count();

                CheckOutBooks = CheckOutBooks + Number(coutform.elements.count.value)

                tcount.innerHTML = TotalBooks;
                acount.innerHTML = AvailableBooks;
                ccount.innerHTML = CheckOutBooks;

                if(book.acount <= 0){
                    book.status = 'notavailable'
                }

                coutSuccess.style.display = 'block';
                coutFailed.style.display = 'none';

                update_books()
                return false;
            }
        }
        coutSuccess.style.display = 'none';
        coutFailed.style.display = 'block';
        return false;
    }  
    
    cinform.onsubmit = function(event){
        event.preventDefault();
        console.log("submitted");

        for(let book of bookDetails){
            if(book.bid == cinform.elements.lname.value && (book.count - book.acount) >= Number(cinform.elements.count.value)){
                console.log(book);

                book.acount = book.acount + Number(cinform.elements.count.value)

                AvailableBooks = 0;
                TotalBooks = 0;
                update_count()

                CheckOutBooks = CheckOutBooks - Number(cinform.elements.count.value)

                tcount.innerHTML = TotalBooks;
                acount.innerHTML = AvailableBooks;
                ccount.innerHTML = CheckOutBooks;

                if(book.acount > 0){
                    book.status = 'available'
                }

                cinSuccess.style.display = 'block';
                cinFailed.style.display = 'none';
                return false;
            }
        }
        cinFailed.style.display = 'block';
        cinSuccess.style.display = 'none';
        return false;
    }

    addform.onsubmit = (event)=>{
        event.preventDefault()
        console.log('submitted');

        for(let book of bookDetails){
            if(book.bid == addform.elements.bid.value){
                book.count = book.count + addform.elements.count.value
                book.acount = book.acount + addform.elements.count.value

                AvailableBooks = 0;
                TotalBooks = 0;
                update_count()
        
                tcount.innerHTML = TotalBooks;
                acount.innerHTML = AvailableBooks;
                ccount.innerHTML = CheckOutBooks;
        
                update_books()
                addSuccess.style.display = 'block';
                addFailed.style.display = 'none';

                return false;
            }
        }

        bookDetails.push({
            bid : addform.elements.bid.value,
            pname : addform.elements.pname.value,
            lang : addform.elements.language.value,
            aname : addform.elements.aname.value,
            bname : addform.elements.bname.value,
            subject: addform.elements.subject.value,
            status: 'available',
            count: Number(addform.elements.count.value),
            acount: Number(addform.elements.count.value)
        });

        console.log(bookDetails)

        addSuccess.style.display = 'block';
        addFailed.style.display = 'none';
        
        AvailableBooks = 0;
        TotalBooks = 0;
        update_count()

        tcount.innerHTML = TotalBooks;
        acount.innerHTML = AvailableBooks;
        ccount.innerHTML = CheckOutBooks;

        update_books()

        return false;
    }

    removeform.onsubmit = (event)=>{
        event.preventDefault()
        console.log('submitted');

        for(let book of bookDetails){
            if(book.bid == removeform.elements.bid.value){
                bookDetails = bookDetails.filter(item => item.bid != book.bid)

                console.log(bookDetails)

                AvailableBooks = 0;
                TotalBooks = 0;
                update_count()
        
                tcount.innerHTML = TotalBooks;
                acount.innerHTML = AvailableBooks;
                ccount.innerHTML = CheckOutBooks;
        
                update_books()
                removeSuccess.style.display = 'block';
                removeFailed.style.display = 'none';
                return false;
            }
        }
    removeFailed.style.display = 'block';
    removeSuccess.style.display = 'none';
    return false;
    }

})