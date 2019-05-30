const localstorage_values = [];
function init_localstorage(){
    for (let i = 0, len = localStorage.length; i < len; ++i) {
        localstorage_values.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    }
}
/** entry point of LMS, generates a table from data in local storage 
 */
function main() {
    init_localstorage();
    let tbl = document.getElementById('tbl');
    localstorage_values.map(book => {
        let tr = document.createElement('tr');
        addCell(tr)
        addCell(tr, book.name);
        addCell(tr, book.author);
        addCell(tr, book.publisher);
        addCell(tr, book.date);
        addBtn(tr, 'delete', "remove(this);")
        addBtn(tr, 'update', "update(this);")
        tbl.appendChild(tr)
    })
}
/**
 * extracts parameters from url to know whether to call add logic or update logic
 * @param {string} url_string   
 */
function urlParser(url_string) {
    init_localstorage();
    const url = new URL(url_string);
    const action = url.searchParams.get("action");
    if (action === 'add') {
        document.getElementById("heading").innerHTML = 'Add a Book';
    } else if (action === 'update') {
        document.getElementById("heading").innerHTML = 'Update Book';
        const book = JSON.parse(localStorage.getItem(url.searchParams.get("key")));
        document.getElementById("name").value = book.name;
        document.getElementById("author").value = book.author;
        document.getElementById("publisher").value = book.publisher;
        document.getElementById("date").value = book.date;
        document.getElementById("name").readOnly = true;
    }
}

/**
 * entry point of Author and Publisher's page, 
 * extracts parameters from url to decide between the two pages
 * @param {string} url_string 
 */

function getList(url_string) {
    init_localstorage();
    const url = new URL(url_string);
    const title = url.searchParams.get("title");
    const tbl = document.getElementById('tbl');
    let auth_pub = {};
    if (title == 'author') {
        document.getElementById("title").innerHTML = 'Author';

    } else if (title == 'publisher') {
        document.getElementById("title").innerHTML = 'Publisher';
    }
    localstorage_values.map(book => {
        auth_pub[book[title]] = (auth_pub[book[title]] + 1) || 1;
    });

    for (const key in auth_pub) {
        let tr = document.createElement('tr');
        addCell(tr);
        addCell(tr, key);
        addCell(tr, auth_pub[key]);
        addBtn(tr, 'delete', "removeCascade(this);")
        tbl.appendChild(tr);
    }
}
/**
 * removes the book from local storage when author/ publisher removes
 * @param {object} instance 
 */

function removeCascade(instance) {
    let parent = instance.parentNode.parentNode;
    const title = document.getElementById('title').innerHTML.toLowerCase();
    const name = parent.childNodes[1].innerText;
    localstorage_values.map((book) => {
        if (book[title] === name) {
            localStorage.removeItem(book.name);
        }
    });
    parent.parentNode.removeChild(parent);
}

/**
 * calls the update page
 * @param {object} instance 
 */
function update(instance) {
    let parent = instance.parentNode.parentNode;
    const bookkey = parent.childNodes[1].innerText;
    window.location.assign(`editbook.html?action=update&key=${bookkey}`);
}

/**
 * removes a book
 * @param {object} instance 
 */
function remove(instance) {
    let parent = instance.parentNode.parentNode;
    const book_name = parent.childNodes[1].innerText;
    localStorage.removeItem(book_name);
    parent.parentNode.removeChild(parent);
}

/**
 * inserts a Cell in a table
 * @param {object} tr table row
 * @param {string} val value to insert inside cell of table
 */
function addCell(tr, val = '') {
    let td = document.createElement('td');
    td.innerHTML = val;
    tr.appendChild(td)
}

/**
 * inserts a button in table
 * @param {object} tr table row
 * @param {string} value value inside button
 * @param {string} fnct on click function name
 */
function addBtn(tr, value, fnct) {
    let td = document.createElement('td');
    let btn = document.createElement('button');
    btn.className = "cell-btn";
    btn.innerText = value;
    btn.setAttribute("onclick", fnct);
    td.appendChild(btn);
    tr.appendChild(td);
}

/**
 * adds a book data inside local storage
 */
function addBook() {
    let book = {
        'name': document.getElementById("name").value,
        'author': document.getElementById("author").value,
        'publisher': document.getElementById("publisher").value,
        'date': document.getElementById("date").value,
    }
    if (validate(book)) {
        localStorage.setItem(book.name, JSON.stringify(book));
        window.location = "index.html";
    }
}

/**
 * checks duplicate valuesp
 * 
 * @param {array} book 
 */
function validate(book) {
    localstorage_values.map((ls_book) => {
        if (JSON.stringify(ls_book) === JSON.stringify(book) ) {
            //alert('duplicate enteries not allowed');
            return false;
        }
    });
    return true;
}


