$(()=>{

	const preloader = (()=>{
		let
			percentsTotal = 0
			,percentsValue = $('.preloader__percents')
			,preloader = $('.preloader');

		// Проверяет все элементы на странице и берет только картинки
		const imgPath = $("body *").map((idx, elem)=>{
			let
				bgImg = $(elem).css('background-image')
				,img = $(elem).is('img')
				,path = '';

			if(bgImg != 'none') path = bgImg.replace('url("', '').replace('")', '');
			
			if(img) path = $(elem).attr('src');
								
			if (path)	return path;
								
		});

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
			let percents = Math.ceil(current / total * 100); 
			percentsValue.text(percents + '%');
			console.log(percents);
			if(percents >= 100){
				preloader.fadeOut();	
			}
		}

		// Псевдо загрузка картинок
		const loadImg = (img)=>{			
			if(!img.length){
				preloader.fadeOut();	
			}

			img.forEach(elem => {
				let fakeImg = $('<img>', {
					attr:{
						src: elem
					}
				})

				fakeImg.on('load',(e)=>{
					console.log(fakeImg);
					percentsTotal++;
					console.log(percentsTotal);
					console.log(img.length);
					setPercents(img.length, percentsTotal);
				})
			});
		}

	return{
		init: function(){
			let imgs = imgPath.toArray();
			let ext = ['jpg','jpeg','png'];
			let list = trueImg(imgs, ext);		
			loadImg(list);
		}
	}
})();




	preloader.init();
})