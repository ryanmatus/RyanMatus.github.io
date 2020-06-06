function precarica( img ) {
			$( img ).each( function () {
				$( '<img/>' )[ 0 ].src = this;
			});
		}
		precarica([
				'/assets/map-yellow.png',
				'/assets/map-red.png',
				'/assets/map-pink.png',
				'/assets/map-green.png',
				'/assets/map-blue.png'
			]);
				
	/*******jQuery for external title*********/
				
		jQuery(document).ready(function () {
			$('.title-blue').mouseout(function(){
				$("#map").attr('src', '/assets/map-original.png');
			}),
			$('.title-blue').mouseover( function(){
				$("#map").attr('src', '/assets/map-blue.png');
			});
			$('.title-red').mouseout(function(){
				$("#map").attr('src', '/assets/map-original.png');
			}),
			$('.title-red').mouseover( function(){
				$("#map").attr('src', '/assets/map-red.png');
			});
			$('.title-green').mouseout(function(){
				$("#map").attr('src', '/assets/map-original.png');
			}),
			$('.title-green').mouseover( function(){
				$("#map").attr('src', '/assets/map-green.png');
			});	
			$('.title-yellow').mouseout(function(){
				$("#map").attr('src', '/assets/map-original.png');
			}),
			$('.title-yellow').mouseover( function(){
				$("#map").attr('src', '/assets/map-yellow.png');
			});
			$('.title-pink').mouseout(function(){
				$("#map").attr('src', '/assets/map-original.png');
			}),
			$('.title-pink').mouseover( function(){
				$("#map").attr('src', '/assets/map-pink.png');
			});	
		});