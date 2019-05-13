let news_arr = [];

let news_info = {
			displayed_news_count: 0,
			all_loaded: false,
			current_page: 1,
			current_source: '',
			current_q: ''
		};

function update_news(data, info) {
	console.log(data);
	
	news_arr.length = 0;
	if (info.displayed_news_count < 40) {
		for (i=0; i<data.articles.length; i++)
			news_arr[i] = data.articles[i];
		info.displayed_news_count += data.articles.length;
		info.current_page++;
	}	
	info.all_loaded = (data.totalResults == info.displayed_news_count || info.displayed_news_count == 40);
}

function update_sources(data) {

	news_arr.length = 0;
	for (i=0; i<data.sources.length; i++)
		news_arr[i] = data.sources[i];
}

function set_q(info) {
	info.current_page = 1;
	info.displayed_news_count = 0;
	info.current_q = document.querySelector('.find-text').value;
}

function set_source(info, elem) {
	info.current_page = 1;
	info.displayed_news_count = 0;
	info.current_source = elem.querySelector('.tmpl__source__id').innerHTML;
}

function show_all(info) {
	info.current_source = '';
	info.current_page = 1;
	info.display_news_count = 0;
}