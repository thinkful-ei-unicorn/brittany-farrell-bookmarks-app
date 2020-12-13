import * as help from './helperFunctions.js'
import * as file from './store.js'
import * as book from './server.js'

let baseUrl = help.variables.baseUrl

export function generateStore() {
    fetch(baseUrl)
        .then(data => data.json())
        .then(dataJson => help.createBookmarksArray(dataJson));
}

export function extendApi(title, url, rating, desc) {
    const bookmarkData = JSON.stringify({
        title: `${title}`,
        url: `${url}`,
        rating: `${rating}`,
        desc: `${desc}`
    });

    fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: bookmarkData
    })
        .then(res => {
            if (res.ok) {
                file.store.error = null
                return res.json();
            }
            file.store.error = res.statusText + ': \n All links must begin with http(s)://'
            book.render();
        })
        .then(data => help.finishBookmarkObject(data));
}

export function deleteBookmark(id) {
    console.log('will delete ' + id)
    fetch(baseUrl + '/' + id, {
        method: 'DELETE'
    })
        .then(() => help.removeBookmark(id))
}