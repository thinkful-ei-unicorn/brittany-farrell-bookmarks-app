/* eslint-disable indent */
/* eslint-disable strict */

// store
export let store = {
    bookmarks: [],
    adding: false,
    error: null,
    filter: 0
  };


// generator functions
export function generateHeader() {
    return `
            <h1>My Bookmarks</h1>

            <button id="js-render-form" type="button">+  New <img class="icon" src="./images/bookmark-icon.png" alt="icon"></button>
          
            <button id="js-filter-list">Filter By <img class="icon" src="./images/dropdown-icon.png" alt="icon"></button>`;
}

export function generateForm() {
    return `
    <form id="add-created-bookmark">
        <h1>My Bookmarks</h1>

        <div class="linkInput">
            <label for="link">Add New Bookmark:</label>
            <input type="text" id="link" name="link" placeholder="www.bookmark.com">
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
    </form>`;
}

export function generateFilterForm() {
    return `
    <h1>My Bookmarks</h1>
        <div id="filter-form js-filter-form">
        
        <h2>Filter Bookmarks by Rating</h2>

                <button type="button" id="js-zero">
                    None
                    <div class="filterStars"><img src="./images/empty-star.png" alt="full star" class="ratingImage">
                    <img src="./images/empty-star.png" alt="full star" class="ratingImage">
                    <img src="./images/empty-star.png" alt="full star" class="ratingImage">
                    <img src="./images/empty-star.png" alt="full star" class="ratingImage">
                    <img src="./images/empty-star.png" alt="empty star" class="ratingImage"></div>
                </button>

                <button type="button" id="js-one">
                    One Star
                    <div class="filterStars">${generateRating(1)}</div>
                </button>

                <button type="button" id="js-two">
                    Two Stars
                    <div class="filterStars">${generateRating(2)}</div>
                </button>

                <button type="button" id="js-three">
                    Three Stars
                    <div class="filterStars">${generateRating(3)}</div>
                </button>

                <button type="button" id="js-four">
                    Four Stars
                    <div class="filterStars">${generateRating(4)}</div>
                </button>

                <button type="button" id="js-five">
                    Five Stars
                    <div class="filterStars">${generateRating(5)}</div>
                </button>
        </div>`
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
    <section class="bookmark">
        <div class="js-item-header itemHeader" id="${obj.id}">
            <h2>${obj.title}</h2>
            <div class="rating">
                ${generateRating(obj.rating)}
            </div>
        </div>
    </section>`;
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
    console.log(store.bookmarks)
    let filtered = store.bookmarks.filter(function(x) {
        if (x.rating >= store.filter) {
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

