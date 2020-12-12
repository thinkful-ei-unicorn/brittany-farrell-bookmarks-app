/* eslint-disable indent */
/* eslint-disable strict */
import * as gen from './generators.js'
import * as book from './bookmark.js'
import * as file from './store.js'
import * as help from './helperFunctions.js'
import * as api from './api.js'

let store = file.store



export function handleNewClick() {
    $('header').on('click', '#js-render-form', function(event) {
        event.preventDefault();
        store.adding = true;
        book.render();
    });
}

export function handleCancelClick() {
    $('main').on('click', '#js-cancel', function(event) {
        event.preventDefault();
        store.adding = false;
        store.error = null
        book.render();
    });
}

export function handleCreateClick() {
    $('main').on('submit', '#add-created-bookmark', function(event) {
        event.preventDefault();

        let title = $(this).find('#title').val();
        let url = $(this).find('#link').val();
        let rate = $(this).find('input:checked').val();
        let rating = help.findApiRating(rate);
        let desc = $(this).find('#text-desc').val();

        api.extendApi(title, url, rating, desc)
    });
}

export function handleFilterClick() {
    $('header').on('change', '#js-filter-form', function(event) {
        event.preventDefault();

        let x = $(this).find('option:selected').val();
        store.filter = parseInt(x)
        help.variables.filtering = false

        book.render();
    });
}

export function handleHeaderClick() {
    $('main').on('click', '.js-item-header', function(event) {
        event.preventDefault();
       console.log(this.id)
       let checkBy = this.id

       store.bookmarks.forEach(function(x) {
           if (checkBy === x.id) {
               x.expanded = !x.expanded
           }
       })
        book.render();
    });
}

export function handleDeleteClick() {
    $('main').on('click', '.js-delete', function(event) {
        event.preventDefault();
        let findBy = this.id

        api.deleteBookmark(findBy)
        
    });
}