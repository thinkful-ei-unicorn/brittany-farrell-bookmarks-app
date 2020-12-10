/* eslint-disable indent */
/* eslint-disable strict */
import * as gen from './generators.js'
import * as event from './eventListeners.js'

// Api functions
const basreUrl = `https://thinkful-list-api.herokuapp.com/brittanyfarrell/bookmarks`;

export function generateStore() {
    fetch(basreUrl)
        .then(data => data.json())
        .then(dataJson => createBookmarksArray(dataJson));
        
}

function createBookmarksArray(arr) {
    arr.forEach(obj => {
        obj.expanded = false;
        obj.editing = false;
    })
    setStore(arr);
}

function setStore(arr) {
    arr.forEach(function(x) {
        gen.store.bookmarks.push(x)
    })
    render();
}

export function extendApi(title, url, rating, desc) {
    const bookmarkData = JSON.stringify({
        title: `${title}`,
        url: `${url}`,
        rating: `${rating}`,
        desc: `${desc}`
    });

    fetch(basreUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: bookmarkData
    })
        .then(res => res.json())
        .then(data => finishBookmarkObject(data))
        .catch(err => console.error(err.message));
}

function finishBookmarkObject(obj) {
    obj.expanded = false;
    obj.editing = false;
    addBookmarkObject(obj)
}

function addBookmarkObject(obj) {
    gen.store.bookmarks.push(obj);
    render();
}

export function deleteBookmark(id) {
    console.log('will delete ' + id)
    fetch(basreUrl + '/' + id, {
        method: 'DELETE'
    })
        .then(() => removeBookmark(id))
}

function removeBookmark(id) {
let filtered = gen.store.bookmarks.filter(x => {
    if (x.id !== id) {
        return x
    }
})
gen.store.bookmarks = filtered;
render();
}

export function render() {
    let HTML = '';
    let headerHTML = '';

    if (gen.store.adding) {
        HTML = gen.generateForm();
    } if (!gen.store.adding) {
        if (!event.filtering) {
            headerHTML = gen.generateHeader();
            HTML = gen.generateBookmarkList();
        }
        if (event.filtering) {
            headerHTML = gen.generateFilterForm();
            }
    }

    $('main').html(HTML);
    $('header').html(headerHTML);
}

function main() {
    generateStore();

    event.handleNewClick();
    event.handleCancelClick();
    event.handleCreateClick();
    event.handleFilterClick();
    event.handleHeaderClick();
    event.handleDeleteClick();

    event.handleOneClick();
    event.handleTwoClick();
    event.handleThreeClick();
    event.handleFourClick();
    event.handleFiveClick();
    event.handleNoneClick();

}

$(main);