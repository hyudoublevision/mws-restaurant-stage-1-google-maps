//declare cacheName and cacheList
const cacheName = "restaurantCache";
const cacheList = [
				'/index.html',
				'/restaurant.html',
				'/css/styles.css',
				'/data/restaurants.json',
				'/img/1.jpg',
				'/img/2.jpg',
				'/img/3.jpg',
				'/img/4.jpg',
				'/img/5.jpg',
				'/img/6.jpg',
				'/img/7.jpg',
				'/img/8.jpg',
				'/img/9.jpg',
				'/img/10.jpg',
				'/js/dbhelper.js',
				'/js/main.js',
				'/js/restaurant_info.js'
				];
				
	self.addEventListener('install', function(event){
		 event.waitUntil(
		     caches.open(cacheName).then(function(cache) {
				    return cache.addAll(cacheList).catch(function(error){
						  console.log("installation error: " + error);
					});
			 }));
	});

	self.addEventListener('fetch', function(event) {
		  event.respondWith(
		         caches.match(event.request).then(function(response) {
					      if(response) {
							     return response;
						  }
                           else{
                                 return fetch(event.request).then(function(response)
								 {
									   let clone_response = response.clone();
									   caches.open(cacheName).then(function(cache) {
										     cache.put(event.request, clone_response);
									   })
									   return response;
								 }).catch(function(error) {
									   console.log("fetch error: " + error);
								 });



						   }						   
				 }));
			
		
		
	});
					   