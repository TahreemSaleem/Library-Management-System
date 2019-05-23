var books = [{
        "name": "Harry Potter",
        "author": "J.K. Rowling",
        "publisher": "Bloomsbury Publishing",
        "date": "1997-06-26"
    }, {
        "name": "Dracula",
        "author": "Bram Stoker",
        "publisher": "Constible & Robinson",
        "date": "1897-04-05"
    },

];

function addCell(tr, val = []) {
    let td = document.createElement('td');
    td.innerHTML = val;
    tr.appendChild(td)
}


function addRow(tbl, values) {
    let tr = document.createElement('tr');
    addCell(tr)
    for (const value of values) {
        addCell(tr, value);
    }
    addBtn(tr, 'delete', "Remove(this);")
    addBtn(tr, 'update', "Remove(this);")
    tbl.appendChild(tr)
}

function Remove(o) {

    var p = o.parentNode.parentNode;
    name = p.childNodes[1].innerText;

    // books = books.filter(function(value, index, arr) {

    //     return value.name != name;

    // });
    localStorage.removeItem(name);
    p.parentNode.removeChild(p);
}

function addBtn(tr, value, fnct) {
    let td = document.createElement('td');
    let btn = document.createElement('input');
    btn.type = "button";
    btn.className = "btn";
    btn.value = value;
    btn.setAttribute("onclick", fnct);
    td.appendChild(btn);
    tr.appendChild(td);
}

function addBook() {
    // let book = new Map();
    // book.set(name, document.getElementById("book-name").value);
    // book.set(author, document.getElementById("author").value);
    // book.set(publisher, document.getElementById("publisher").value);
    // book.set(date, document.getElementById("date").value)
    // console.log(book);
    // userRoles.values()
    let book = {}
    book.name = (document.getElementById("book-name").value);
    book.author = (document.getElementById("author").value);
    book.publisher = (document.getElementById("publisher").value);
    book.date = (document.getElementById("date").value);
    window.localStorage.setItem(book.name, JSON.stringify(book))
    window.location = "index.html";
}


function main() {
    for (const book of books) {
        window.localStorage.setItem(book.name, JSON.stringify(book))
    }

    let tbl = document.getElementById('tbl');

    const items = {...localStorage };
    Object.entries(items).forEach(
        ([key, value]) => addRow(tbl, Object.values(JSON.parse(value)))
    );

}