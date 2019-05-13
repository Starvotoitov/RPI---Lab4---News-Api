
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

function find_source_button(elem)
{
	while (elem.tagName !== 'BUTTON')
		elem = elem.parentNode;
	return elem;
}

function set_sources_eventListeners() {
	document.querySelector('.news-block__sources__specific').addEventListener('click', function() {
		let source_button = find_source_button(event.target);
		set_source(news_info, source_button);
		clear_news();
		get_news(news_info)
		.then(response => { return response.json() })
		.then(data => update_news(data, news_info))
		.then(() => show_news(news_arr, news_info));
	});
}

get_sources()
.then(response => { return response.json() })
.then(data => update_sources(data))
.then(() => show_sources(news_arr))
.then(() => set_sources_eventListeners());

get_news(news_info)
.then (response => { return response.json() })
.then(data => update_news(data, news_info))
.then(() => show_news(news_arr, news_info));

document.querySelector('#load-more').addEventListener('click', function() {
	get_news(news_info)
	.then (response => { return response.json() })
	.then(data => update_news(data, news_info))
	.then(() => show_news(news_arr, news_info));
});

document.querySelector('.find-button').addEventListener('click', function() {
	set_q(news_info);
	clear_news();
	get_news(news_info)
	.then (response => { return response.json() })
	.then(data => update_news(data, news_info))
	.then(() => show_news(news_arr, news_info));				
});

document.querySelector('.find-text').addEventListener('keydown', function() {
	if (event.keyCode == 13)
	{
		set_q(news_info);
		clear_news();
		get_news(news_info)
		.then (response => { return response.json() })
		.then(data => update_news(data, news_info))
		.then(() => show_news(news_arr, news_info));		
	}
});

document.querySelector('.news-block__sources__all').addEventListener('click', function() {
	show_all(news_info);
	clear_news();
	get_news(news_info)
	.then (response => { return response.json() })
	.then(data => update_news(data, news_info))
	.then(() => show_news(news_arr, news_info));	
});