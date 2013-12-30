var CategoryPresenter = function ( options ){
	this.collection = options.collection;
	this.collection.on("sync", this.displayData, this);
}

CategoryPresenter.prototype.displayData = function (collection){
	$('#scroller-left').append('<ul class="list" id="menu-left"></ul>').el;
	$('#menu-left').append('<li class="cat-list" ><a href="#">Home</a></li>');
	collection.each(function(item){
		$('#menu-left').append(new CategoryView({
			model: item.toJSON()
		}).el);
	});
	
	leftScroll = new iScroll('left-drawer',{
				 hideScrollbar: true,
                 fadeScrollbar: true
	});	
}