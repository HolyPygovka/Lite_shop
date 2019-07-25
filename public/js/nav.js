console.log("nav.js");

document.querySelector('.close_btn').onclick = navHide;
document.querySelector('.burger_btn').onclick = navShow;
function navHide(){
    document.querySelector('.main_nav_block').classList.remove('active');
};
function navShow(){
    document.querySelector('.main_nav_block').classList.add('active');
};

function getNavPages(){
    fetch('/get-nav-page', {
        method: 'POST'
    })
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            showNavPages(myJson);
        });
};

function showNavPages(data) {
    let navStr = `<li><a href="/">Главная</a></li>`;
    for (let i=0; i<data.length; i++) {
        navStr = navStr + `<li><a href="/cat?id=`+data[i]['id']+`">`+data[i]['category']+`</a></li>`;
    }
    document.querySelector('#main_nav').innerHTML = navStr;
};

getNavPages();