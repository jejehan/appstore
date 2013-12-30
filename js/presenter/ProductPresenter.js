var ProductPresenter = function ( options ){
	this.collection = options.collection;
	this.collection.on("sync", this.displayData, this);
}

ProductPresenter.prototype.displayData = function (collection){
	$('#scroller').append('<div class="row full-width" id="display-data"></div>').el;
	//console.log(collection)
	collection.each(function(item){
		$('#display-data').append(new ProductView({
			model: item.toJSON()
		}).el);
	});
	
	if(collection.length%2==1){
		add = 	'<div class="small-6 large-6 columns" id="home-product" style="background:#A7DBD8;">'+
				'<div id="image" align="center"></div>' +
				'</div> '
	}else{
		add = ''
	}
	$('#display-data').append(add);
}