var HomeSliderPresenter = function ( options ){
	this.collection = options.collection;
	this.collection.on("sync", this.displayData, this);
}

HomeSliderPresenter.prototype.displayData = function (collection){
	var content=' <div class="row full-width"> ' +
				' 	<div class="large-7 large-centered columns"> ' +
				' 		<div class="slideshow-wrapper" > ' +
				' 			<span class="preloader"></span> ' +
				' 			<ul id="HomeSlider" data-orbit data-options="pause_on_hover:false; timer_speed:5000;"> ' +
				' 			</ul> ' +
				' 		</div> ' +
				' 	</div> ' +
				' </div> ';
	$('#scroller').html(content).el;
	collection.each(function(item){
		$('#HomeSlider').append(new HomeSliderView({
			model: item.toJSON()
		}).el);
	});
}