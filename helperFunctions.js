
import * as file from './store.js'
import * as book from './bookmark.js'

export const variables = {
    baseUrl: `https://thinkful-list-api.herokuapp.com/brittanyfarrell/bookmarks`,
    filtering: false
}

export function findApiRating(rate) {
    switch(rate) {
        case 'one':
            return 1;
        case 'two':
            return 2;
        case 'three':
            return 3;
        case 'four':
            return 4;
        case 'five':
            return 5;
    }
};

export function createBookmarksArray(arr) {
    arr.forEach(obj => {
        obj.expanded = false;
        obj.editing = false;
    })
    setStore(arr);
}

function setStore(arr) {
    arr.forEach(function(x) {
        file.store.bookmarks.push(x)
    })
    book.render();
}

export function finishBookmarkObject(obj) {
    obj.expanded = false;
    obj.editing = false;
    addBookmarkObject(obj)
}

function addBookmarkObject(obj) {
    file.store.bookmarks.push(obj);
    file.store.adding = false
    book.render();
}

export function removeBookmark(id) {
let filtered = file.store.bookmarks.filter(x => {
    if (x.id !== id) {
        return x
    }
})
file.store.bookmarks = filtered;
book.render();
}