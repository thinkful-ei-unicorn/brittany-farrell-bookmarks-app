/* eslint-disable indent */
/* eslint-disable strict */
import * as gen from './generators.js'
import * as event from './eventListeners.js'
import * as file from './store.js'
import * as api from './api.js'

let store = file.store

// Api functions
export function render() {
    let HTML = '';
    let headerHTML = '';
    let errorHTML = "";

    
    if (file.store.adding) {
        HTML = gen.generateForm();
    } if (!file.store.adding) {
        if (!event.filtering) {
            headerHTML = gen.generateHeader();
            HTML = gen.generateBookmarkList();
        }
        if (event.filtering) {
            headerHTML = gen.generateFilterForm();
            }
    }

    if (file.store.error !== null) {
        errorHTML = file.store.error
    }

    
    
    

    $('#js-error').html(errorHTML);
    $('#js-main-content').html(HTML);
    $('header').html(headerHTML);
}

function main() {
    api.generateStore();

    event.handleNewClick();
    event.handleCancelClick();
    event.handleCreateClick();
    event.handleFilterClick();
    event.handleHeaderClick();
    event.handleDeleteClick();

}

$(main);