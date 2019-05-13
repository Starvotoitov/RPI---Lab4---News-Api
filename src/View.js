
function clear_news_list(info) {
	let list = document.getElementsByClassName('news__tmpl__link');
	let i;
	for (i=0;i<list.length;)
		list[i].remove();
}

function create_news_block(article, fragment) {
	let token = news__tmpl.content.cloneNode(true);
	token.querySelector('.news__tmpl__image').src = article.urlToImage;
	token.querySelector('.news__tmpl__title').innerHTML = article.title;
	token.querySelector('.news__tmpl__description').innerHTML = article.description;
	token.querySelector('.news__tmpl__link').href = article.url;
	fragment.appendChild(token);
}

function create_source_block(source, fragment) {
	let token = tmpl__source.content.cloneNode(true);
	token.querySelector('.tmpl__source__name').innerHTML = source.name;
	token.querySelector('.tmpl__source__id').innerHTML = source.id;
	token.querySelector('.tmpl__source__button').title = source.description;
	fragment.appendChild(token);
}

function show_news(news_arr, info) {
	let fragment = document.createDocumentFragment();
	for (i=0; i<news_arr.length; i++) {
		create_news_block(news_arr[i], fragment);	
	}
	document.querySelector('.news-block__news-list').appendChild(fragment);
	if (info.all_loaded)
		document.querySelector('.load-more-button').style.display = 'none';
	else
		document.querySelector('.load-more-button').style.display = '';
	if (info.displayed_news_count == 0)
		document.querySelector('.news-block__no-articles-message').style.display = 'block';
}

function show_sources(source_arr) {
	let fragment = document.createDocumentFragment();
	for (i=0; i<source_arr.length; i++) {
		create_source_block(source_arr[i], fragment);
	}
	document.querySelector('.news-block__sources').appendChild(fragment);
}

function clear_news() {
	let list = document.getElementsByClassName('news__tmpl__link');
	for (i=0; i<list.length;)
		list[i].remove();
	document.querySelector('.news-block__no-articles-message').style.display = 'none';
	document.querySelector('.load-more-button').style.display = 'none';
}