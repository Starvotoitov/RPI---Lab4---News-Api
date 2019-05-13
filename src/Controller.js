
function get_sources() {
	let source_url = "https://newsapi.org/v2/sources?country=ru&apiKey=3aa1c23915ca4bf5b663c199b0aaf191"; 
	let req = new Request(source_url);
	return fetch(req);
}

function get_news(info) {
	let news_url = `https://newsapi.org/v2/top-headlines?${info.current_q != '' ? "q=" + info.current_q + "&" : ''}${info.current_source != '' ? "sources=" + info.current_source + "&" : "country=ru&"}pageSize=5&page=${info.current_page}&apiKey=3aa1c23915ca4bf5b663c199b0aaf191`;
	let req = new Request(news_url);
	return fetch(req);	
}

function set_sources_eventListeners() {
	let sources = document.getElementsByClassName('tmpl__source__button');
	for (i=0; i<sources.length; i++) {
		sources[i].addEventListener('click', function() {
			set_source(news_info, this);
			clear_news();
			get_news(news_info)
			.then(function(response) { return response.json(); })
			.then(data => update_news(data, news_info))
			.then(() => show_news(news_arr, news_info));			
		})
	}
}

get_sources()
.then(function(response) { return response.json(); })
.then(data => update_sources(data))
.then(() => show_sources(news_arr))
.then(() => set_sources_eventListeners());

get_news(news_info)
.then(function(response) { return response.json(); })
.then(data => update_news(data, news_info))
.then(() => show_news(news_arr, news_info));

document.querySelector('#load-more').addEventListener('click', function() {
	get_news(news_info)
	.then(function(response) { return response.json(); })
	.then(data => update_news(data, news_info))
	.then(() => show_news(news_arr, news_info));
});

document.querySelector('.find-button').addEventListener('click', function() {
	set_q(news_info);
	clear_news();
	get_news(news_info)
	.then(function(response) { return response.json(); })
	.then(data => update_news(data, news_info))
	.then(() => show_news(news_arr, news_info));				
});

document.querySelector('.find-text').addEventListener('keydown', function() {
	if (event.keyCode == 13)
	{
		set_q(news_info);
		clear_news();
		get_news(news_info)
		.then(function(response) { return response.json(); })
		.then(data => update_news(data, news_info))
		.then(() => show_news(news_arr, news_info));		
	}
});

document.querySelector('.news-block__sources__all').addEventListener('click', function() {
	show_all(news_info);
	clear_news();
	get_news(news_info)
	.then(function(response) { return response.json(); })
	.then(data => update_news(data, news_info))
	.then(() => show_news(news_arr, news_info));	
});