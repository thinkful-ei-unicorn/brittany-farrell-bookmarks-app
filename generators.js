/* eslint-disable indent */
/* eslint-disable strict */

// store
import * as file from './store.js'
let store = file.store


// generator functions
export function generateHeader() {
    return `
            <h1>My Bookmarks</h1>

            <div class="flex">
                <button id="js-render-form" type="button">+  New <img class="icon" src="./images/bookmark-icon.png" alt="icon"></button>
              
                <form action="" id="js-filter-form">
                    <label for="select">Filter by:</label>
                    <select id="select">
                        <option value="zero">Rating</option>
                        <option value="1">One Star
                            <div class="filterStars">${generateRating(1)}</div>
                        </option>
                        <option  value="2">Two Stars
                            <div class="filterStars">${generateRating(2)}</div></option>
                        <option value="3">Three Stars
                            <div class="filterStars">${generateRating(3)}</div></option>
                        <option value="4">Four Stars
                            <div class="filterStars">${generateRating(4)}</div></option>
                        <option value="5">Five Stars
                            <div class="filterStars">${generateRating(5)}</div></option>
                    </select>
                </form>
            </div>`
            ;
}

export function generateForm() {
    return `
    <form id="add-created-bookmark" class="preventBreak">
        <div  class="form">
            <h1>My Bookmarks</h1>
    
            <div class="linkInput">
                <label for="link">Add New Bookmark:</label>
                <input type="text" id="link" name="link" placeholder="http://www.bookmark.com">
            </div>
    
            <div class="details">
                <input type="text" id="title" name="title" placeholder="Enter bookmark title" required>
    
                <div class="options">
                    <div class="submitRating">
                        <label for="rating"><img src="./images/full-star.png" alt="star" class="ratingImage"></label>
                        <input type="radio" name="rating" id="rating" value="one">
                    </div>
                    <div class="submitRating">
                        <label for="rating"><img src="./images/full-star.png" alt="star" class="ratingImage"></label>
                        <input type="radio" name="rating" id="rating" value="two">
                    </div>
                    <div class="submitRating">
                        <label for="rating"><img src="./images/full-star.png" alt="star" class="ratingImage"></label>
                        <input type="radio" name="rating" id="rating" value="three">
                    </div>
                    <div class="submitRating">
                        <label for="rating"><img src="./images/full-star.png" alt="star" class="ratingImage"></label>
                        <input type="radio" name="rating" id="rating" value="four" required>
                    </div>
                    <div class="submitRating">
                        <label for="rating"><img src="./images/full-star.png" alt="star" class="ratingImage"></label>
                        <input type="radio" name="rating" id="rating" value="five">
                    </div>
                </div>
    
                <textarea id="text-desc" width="100%" rows="10" placeholder="Meh taxidermy tumblr pinterest gluten-free semiotics."></textarea>
            </div>
    
            <div class="formButtons">
                <button type="button" id="js-cancel">Cancel</button>
                <input type="submit" id="js-create" value="Create">
            </div>
        </div>
    </form>`;
}
                    


function generateRating(rating) {
let one, two, three, four, five;
one = two = three = four = five = ''
    if (rating === 1) {
        one = 'full'
        two = three = four = five = 'empty'
    } if (rating === 2) {
        one = two = 'full'
        three = four = five = 'empty'
    } if (rating === 3) {
        one = two = three = 'full'
        four = five = 'empty'
    } if (rating === 4) {
        one = two = three = four = 'full'
        five = 'empty'
    } if (rating === 5) {
        one = two = three = four = five = 'full'
    }

    return `
        <img src="./images/${one}-star.png" alt="full star" class="ratingImage">
        <img src="./images/${two}-star.png" alt="full star" class="ratingImage">
        <img src="./images/${three}-star.png" alt="full star" class="ratingImage">
        <img src="./images/${four}-star.png" alt="full star" class="ratingImage">
        <img src="./images/${five}-star.png" alt="empty star" class="ratingImage">`
}

function generateCollapsedBookmark(obj) { 
    return `
    <span>
        <section class="bookmark">
            <div tabindex="0" role="button" class="js-item-header itemHeader" id="${obj.id}">
                <h2>${obj.title}</h2>
                <div class="rating">
                    ${generateRating(obj.rating)}
                </div>
            </div>
        </section>
    </span>`;
}

function generateExpandedBookmark(obj) {

    return `
        <section class="bookmark">
            <div class="js-item-header itemHeader" id="${obj.id}">
                <h2>${obj.title}</h2>
                <div class="rating">
                    ${generateRating(obj.rating)}
                 </div>
            </div>
            <div class="itemBody">
                <div class="bookmarkButtons">
                    <a href="${obj.url}" target="_blank"><button id="link" type="submit">View Website</button></a>
                    <button class="js-delete" id="${obj.id}" type="submit"><img src="images/trash-icon.png" alt="delete" class="delete"></button>
                </div>
                <p class="description">
                <h4>Description: </h4>
                    ${obj.desc}
                </p>
            </div>
        </section>`;
} 

export function generateBookmarkList() {
    console.log(file.store.bookmarks)
    let filtered = file.store.bookmarks.filter(function(x) {
        if (x.rating >= file.store.filter) {
            return x
        }
    })
    let mapped = filtered.map(function(x) {
        if (x.expanded === false) {
            return generateCollapsedBookmark(x);
        } if (x.expanded === true) {
            return generateExpandedBookmark(x);
        }
        
    })
    return mapped
}

