const BASE_URL = 'https://dummyjson.com/products/category/smartphones'
const URL_CATEGORY = 'https://dummyjson.com/products/category/laptops'
const URL_COMMENTS = 'https://dummyjson.com/quotes'
const clothes = document.querySelector('.clothes-bottom-common-container')
const clothesCategory = document.querySelector('.clothes-category')
const clothesInfo = document.querySelector('.clothes-info')
const viewBTN = document.querySelectorAll('.view_btn');
const swiperWraper = document.querySelector('.swiper-wrapper')
const xMark = document.querySelector('.xmark')

let productsData;
let categoryData;
let dataOfApi;
let quotesData;

fetch(BASE_URL)
.then((response) => {
    return response.json()
})
.then(data => {
    productsData = data.products
    showInitialProducts(4, clothes, productsData)
});

fetch(URL_CATEGORY)
.then((response) => {
    return response.json()
})
.then(data => {
    categoryData = data.products
    showInitialProducts(4, clothesCategory, categoryData)
})

fetch(URL_COMMENTS)
.then((response) => {
    return response.json()
})
.then(data => {
    quotesData = data.quotes
    quotesData.forEach(quote => {
        showQuotes(quote)
    })
})

function addProductScreen(element, container) {
    const ratingValue = parseFloat(element.rating)
    const roundedRating = ratingValue.toFixed(1)
    const fullStars = Math.floor(ratingValue)
    const halfStar = ratingValue % 1 !== 0 

    let starsHtml = ''

    for (let i = 0; i < fullStars; i++) {
       starsHtml += '<img src="svg/Star.svg" alt=""></img>' 
    }

    if (halfStar) {
        starsHtml += '<img src="svg/Star-half.svg" alt="">'
    }
    
    let div = `
    <div class="clothes-bottom-container">
        <div class="common-top-part">
            <div class="clothes-img">
                <img src="${element.thumbnail}" alt="">
            </div>
            <div class="clothes-text">
                <p>${element.title}</p>
            </div>
        </div>
        <div class="clothes-common-container">
            <div class="clothes-container">
                <div class="star-icons">
                    ${starsHtml}
                </div>
                <div class="rating">
                    <span>${roundedRating}/</span>
                    <span class="five">5</span>
                </div>
            </div>
            <div class="prices">
                <p class="current-price">$${Math.floor(element.price - (element.price * element.discountPercentage / 100).toFixed(2))}</p>
                <p class="old-price">$${element.price}</p>
                <div class="discountpercentage">
                    <p>-${Math.floor(element.discountPercentage)}%</p>
                </div>
            </div>
        </div>
    </div>
    `
    container.insertAdjacentHTML('beforeend', div)
}

function showInitialProducts(count, container, data) {
    for (let i = 0; i < count && i < data.length; i++) {
        addProductScreen(data[i], container)
    }
}

viewBTN.forEach(btn=>{
    btn.addEventListener('click' , function(e){
        e.preventDefault();
        const targetBTN = e.target;
        let container = targetBTN.closest('.common-clothes-container');
        let commonContainer = container.querySelector('.clothes-bottom-common-container');
        commonContainer.innerHTML = '';
        commonContainer.classList.contains('clothes-info') ? dataOfApi = categoryData : dataOfApi = productsData
        viewBtn(targetBTN , dataOfApi , commonContainer);
    })
});

function viewBtn(button , data , container) {
    const titleContainer = container.previousElementSibling;

    if (!container.classList.contains('full')) {
        data.forEach(product => {
            addProductScreen(product, container)
        });
        button.textContent = 'View Less';
        container.classList.add('full')
    } else {
        showInitialProducts(4, container, data);
        button.textContent = 'View More';
        container.classList.remove('full')
        titleContainer.scrollIntoView({ behavior: 'smooth' });
    }
}

function showQuotes(element, isFirst, isLast) {
    let div = `
<div class="swiper-slide">
    <div class="comments">
        <div class="comments-container">
            <div class="comments-rating">
                <img src="svg/Star.svg" alt="">
                <img src="svg/Star.svg" alt="">
                <img src="svg/Star.svg" alt="">
                <img src="svg/Star.svg" alt="">
                <img src="svg/Star.svg" alt="">
            </div>
            <div class="comments-common-text">
                <div class="comments-top">
                    <p>${element.author}</p>
                    <img src="svg/correct.svg" alt="">
                </div>
                <div class="comments-bottom">
                    <p>${element.quote}</p>
                </div>
            </div>
        </div>
    </div>
</div>
`
    swiperWraper.insertAdjacentHTML('beforeend', div)
    
}

xMark.addEventListener('click', function(e) {
    const targetXmark = e.target
    let parent = targetXmark
    for (let i = 0; i < 5 && parent.parentElement; i++) {
       parent = parent.parentElement 
    }
    parent.remove()
})


