/* eslint-disable indent */
/* eslint-disable strict */
import * as gen from './generators.js'
import * as book from './bookmark.js'

export let filtering = false

export function handleNewClick() {
    $('header').on('click', '#js-render-form', function(event) {
        event.preventDefault();
        gen.store.adding = true;
        book.render();
    });
}

export function handleCancelClick() {
    $('main').on('click', '#js-cancel', function(event) {
        event.preventDefault();
        console.log('cancel clicked')
        gen.store.adding = false;
        book.render();
    });
}

function findApiRating(rate) {
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

export function handleCreateClick() {
    $('main').on('submit', '#add-created-bookmark', function(event) {
        event.preventDefault();

        let title = $(this).find('#title').val();
        let url = $(this).find('#link').val();
        let rate = $(this).find('input:checked').val();
        let rating = findApiRating(rate);
        let desc = $(this).find('#text-desc').val();

        book.extendApi(title, url, rating, desc)

        gen.store.adding = false;
    });
}

export function handleFilterClick() {
    $('header').on('click', '#js-filter-list', function(event) {
        event.preventDefault();
        console.log('filter clicked')
        filtering = true
        book.render();
    });
}

export function handleOneClick() {
    $('header').on('click', '#js-one', function(event) {
        event.preventDefault();
      
        gen.store.filter = 1;
        filtering = false
        book.render();
    });
}

export function handleTwoClick() {
    $('header').on('click', '#js-two', function(event) {
        event.preventDefault();
     
        gen.store.filter = 2;
        filtering = false
        book.render();
    });
}

export function handleThreeClick() {
    $('header').on('click', '#js-three', function(event) {
        event.preventDefault();
     
        gen.store.filter = 3;
        filtering = false
        book.render();
    });
}

export function handleFourClick() {
    $('header').on('click', '#js-four', function(event) {
        event.preventDefault();
       
        gen.store.filter = 4;
        filtering = false
        book.render();
    });
}

export function handleFiveClick() {
    $('header').on('click', '#js-five', function(event) {
        event.preventDefault();
       
        gen.store.filter = 5;
        filtering = false
        book.render();
    });
}

export function handleNoneClick() {
    $('header').on('click', '#js-zero', function(event) {
        event.preventDefault();
       
        gen.store.filter = 0;
        filtering = false
        book.render();
    });
}

export function handleHeaderClick() {
    $('main').on('click', '.js-item-header', function(event) {
        event.preventDefault();
       console.log(this.id)
       let checkBy = this.id

       gen.store.bookmarks.forEach(function(x) {
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

        book.deleteBookmark(findBy)
        
    });
}