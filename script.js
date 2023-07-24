const API_KEY="2b9638492b6448ddbf1aa28832f9d062";
const URL="https://newsapi.org/v2/everything?q=";

window.addEventListener('load',() => fetchNews("world"));
function reload(){
    window.location.reload();
}
async function fetchNews (query){
    const res=await fetch(`${URL}${query}&apikey=${API_KEY}`);
    const data= await res.json();
    bindData(data.articles);
}
function bindData(articles){
    const cardscontainer= document.getElementById('cards-container');
    const newsCardTemplate= document.getElementById("template-news-card");
    cardscontainer.innerHTML='';
    articles.forEach((article)=>{
        if(!article.urlToImage) return;
        const cardsclone=newsCardTemplate.content.cloneNode(true);
        filldataincard(cardsclone,article);
        cardscontainer.appendChild(cardsclone);
    })
}
function filldataincard(cardsclone,article){
    const newsimg=cardsclone.querySelector('#News-img');
    const newsTitle=cardsclone.querySelector('#news-title');
    const newssource=cardsclone.querySelector('#news-source');
    const newsdesc=cardsclone.querySelector('#news-desc');

    newsimg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsdesc.innerHTML=article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });
    newssource.innerHTML=`${article.source.name}:${date}`;
    cardsclone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    })
}
let curselectednav=null;
function onNavItemClick(id){
    fetchNews(id);
    const NavItem=document.getElementById(id);
    curselectednav?.classList.remove('active');
    curselectednav=NavItem;
    curselectednav.classList.add('active');
}
const searchbutton=document.getElementById("search-button");
const searchText=document.getElementById("search-text");
searchbutton.addEventListener("click",() => {
const query=searchText.value;
if(!query)return;
fetchNews(query);
curselectednav?.classList.remove("active");
curselectednav=null;
});

