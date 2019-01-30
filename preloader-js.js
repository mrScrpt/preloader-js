window.addEventListener('DOMContentLoaded',()=>{

	const preloader = (()=>{
		let
			percentsTotal = 0			
			,percentsValue = document.querySelector('.preloader__percents')
			,preloader = document.querySelector('.preloader')
			,body = document.querySelector('body')
			,allElems = body.getElementsByTagName('*')	
			,path = [];	

		// Получаем массив изображений со всей страницы
		for(let i = 0; i < allElems.length ;i++){
			let
				item = allElems[i]
				bg = window.getComputedStyle(item).backgroundImage
				,img = ''	;		
			
			
			if(bg != 'none'){
				path.push(bg.replace('url("','').replace('")',''));
			}

			if(item.tagName == "IMG"){
				let attr = item.getAttribute('src');					
				path.push(attr);
			}				
				
		}
		

		// Проверка на расширение у изображений
		const trueImg = (arrayImg, arrayExt)=>{
			let result = [];
			arrayImg.forEach(img => {
				arrayExt.forEach(ext =>{
					if(img.search(ext) != -1){
						result.push(img);
					}
					
				})
			});			
			return result;
		}


		// Расчет процентов загрузки изображений
		const setPercents = (total, current)=>{
			console.log(total, current);
			let percents = Math.ceil(current / total * 100); 
			percentsValue.innerText = percents + '%';
			//console.log(percents);
			if(percents >= 100){
				fadeIn(preloader, 'page__hidden');
			}
		}
		// Анимация
		function fadeIn(el, classAdd) {
			el.style.opacity = 1;
		
			var last = +new Date();
			var tick = function() {
				el.style.opacity = +el.style.opacity - (new Date() - last) / 1000;
				last = +new Date();
		
				if (+el.style.opacity >= 0) {
					(window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
				}
				if (+el.style.opacity <=  0) {
					el.classList.add(classAdd);
					el.removeAttribute('style');
				}
			};
		
			tick();
		}

		// Псевдо загрузка картинок
		const loadImg = (imgArray)=>{
			let lenImg = imgArray.length;
			if(!lenImg){
				fadeIn(preloader, 'page__hidden');	
			}

			imgArray.forEach(elem => {
				let fakeImg = document.createElement('IMG');
				fakeImg.setAttribute('src', elem);

				fakeImg.addEventListener('load',()=>{
					percentsTotal++;
					setPercents(lenImg, percentsTotal);
				})
			});

		}
			

		

	return{
		init: function(){
			let ext = ['jpg','jpeg','png']; //Список разширений
			let list = trueImg(path, ext); //Получаем массив изображений с нужными расширениями
			loadImg(list); 


			/* let imgs = imgPath.toArray();
			
			let list = trueImg(imgs, ext);		
			loadImg(list); */
		}
	}
})();




	preloader.init();
})