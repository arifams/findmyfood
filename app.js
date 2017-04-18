"use strict";

/*\
(*)This is my app ID + key ID nutrionix, should send it with each API (*)request and to authenticate it
(*)how to use it on cheddar cheese GET: https://api.nutritionix.com/v1_1/search/cheddar%20cheese?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=[YOURID]&appKey=[YOURKEY]
\*/

const myAppId = '2d05c6df';
const  myKeyId = '502e68dd9ed6b17545bd0300d8b43533';
const API_URI = 'https://api.nutritionix.com/v1_1/search/';

function searchFood(term, callback) {
	const xhr = new XMLHttpRequest();
  const uri = API_URI + encodeURIComponent(term) + '?appId=' + myAppId + '&appKey=' + myKeyId;
	xhr.open("GET", uri);
  xhr.onreadystatechange = () => {
    if (xhr.readyState !== 4) return;
    if (!(xhr.status >= 200 && xhr.status < 400)) return;

    callback(JSON.parse(xhr.responseText));
    };
  xhr.send();
}

function resultFood(result) {
  const ul = document.getElementById('results');
  const items = [];
  
  for (const item of result.hits) {
  	items.push(
//    	'<h2>' + item.fields.item_name + '</h2>' same as:
    	`<li><h2>${item.fields.item_name}</h2></li>`
    );
  }
  
  ul.innerHTML = items.join('');
}

function search() {
  const term = document.getElementById('search').value;
  searchFood(term, resultFood);
}

const searchButton = document.getElementById('search-btn');
searchButton.addEventListener('click', search);