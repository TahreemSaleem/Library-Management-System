function main() {
    let tbl = document.getElementById('tbl');
    let tr = document.createElement('tr');
    const items = {...localStorage };
    Object.entries(items).forEach(
        ([key, value]) => {
            let array = [...new Map(JSON.parse(value)).values()];
            addCell(tr)
            array.forEach((value) => {
                addCell(tr, value);
            });
            addBtn(tr, 'delete', "remove(this);")
            addBtn(tr, 'update', "update(this);")
            tbl.appendChild(tr)
        }
    );
}

function urlParser(url_string) {
    const url = new URL(url_string);
    const action = url.searchParams.get("action");
    if (action == 'add') {
        document.getElementById("heading").innerHTML = 'Add a Book';
    } else if (action == 'update') {
        document.getElementById("heading").innerHTML = 'Update Book';
        const map = localStorage.getItem(url.searchParams.get("key"));
        const array = [...new Map(JSON.parse(map)).values()];
        //TODO: make this better
        [document.getElementById("name").value, document.getElementById("author").value, document.getElementById("publisher").value, document.getElementById("date").value] = array;
        // var inputs = document.getElementsByTagName('input');
        // console.log([...inputs])
    }
}

function getList(url_string) {
    const url = new URL(url_string);
    const title = url.searchParams.get("title");
    const items = {...localStorage };
    const tbl = document.getElementById('tbl');
    let map = {};
    if (title == 'author') {
        document.getElementById("title").innerHTML = 'Author';

    } else if (title == 'publisher') {
        document.getElementById("title").innerHTML = 'Publisher';
    }
    Object.entries(items).forEach(
        ([key, value]) => {
            key = new Map(JSON.parse(value)).get(title);
            map[key] = (map[key] + 1) || 1;
        }
    );
    Object.entries(map).forEach(
        ([key, value]) => {
            let tr = document.createElement('tr');
            addCell(tr);
            addCell(tr, key);
            addCell(tr, value);
            addBtn(tr, 'delete', "removeCascade(this);")
            tbl.appendChild(tr)
        }
    );
}

function removeCascade(instance) {
    let parent = instance.parentNode.parentNode;
    const title = document.getElementById('title').innerHTML;
    const name = parent.childNodes[1].innerText;
    const items = {...localStorage };
    Object.entries(items).forEach(
        ([key, value]) => {
            if (new Map(JSON.parse(value)).get(title.toLowerCase()) == name) {
                localStorage.removeItem(key);
            }
        }
    );
    parent.parentNode.removeChild(parent);
}



function update(instance) {
    let parent = instance.parentNode.parentNode;
    const key = parent.childNodes[1].innerText;
    window.location.assign("editbook.html?action=update&key=" + key);
}

function remove(instance) {
    let parent = instance.parentNode.parentNode;
    const name = parent.childNodes[1].innerText;
    localStorage.removeItem(name);
    parent.parentNode.removeChild(parent);
}

function addCell(tr, val = []) {
    let td = document.createElement('td');
    td.innerHTML = val;
    tr.appendChild(td)
}

function addBtn(tr, value, fnct) {
    let td = document.createElement('td');
    let btn = document.createElement('button');
    btn.className = "cell-btn";
    btn.innerText = value;
    btn.setAttribute("onclick", fnct);
    td.appendChild(btn);
    tr.appendChild(td);
}

function addBook() {
    let book = new Map();
    book.set('name', document.getElementById("name").value);
    book.set('author', document.getElementById("author").value);
    book.set('publisher', document.getElementById("publisher").value);
    book.set('date', document.getElementById("date").value)
    window.localStorage.setItem(book.get('name'), JSON.stringify([...book.entries()]))
    window.location = "index.html";
}