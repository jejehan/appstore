function cekColor(id)
{
	
	if(id>3){
		if((id/3) >= 2 ){
			div = (id / 3)
			id = id - (3 * parseInt(div))
			//console.log(div)
		}else{
			id = id - 3
		}
	}
	//console.log(id)
	switch(id)
	{
		case 0:
			colors = "#FFB187";
		break;
		case 1:
			colors = "#C4DE87";
		break;
		case 2:
			colors = "#89D3F5";
		break;
		case 3:
			colors = "#FFE88A";
		break;
		default:
			colors = "#F9CDAD";
		break;
	}
	//console.log(colors)
	return colors;
}

Handlebars.registerHelper('home-background', function(id){
	return cekColor(id);
});

Handlebars.registerHelper( 'sisakolom', function(array,id) {
	var id = parseInt(array.length)
	var colors = cekColor(id)
	console.log(colors)
	if(array.length%2==1){
		add = '<div class="small-6 large-6 columns" id="home-product" style="background:' + colors + ';"><div id="image" align="center"></div></div> '
	}else{
		add = ''
	}
    return add;           
});
		 
var CategoryDetailsView = Backbone.View.extend({
	template: Handlebars.compile(
		'<div class="small-6 large-6 columns" id="home-product" style="background:{{home-background  this.index }};"> ' +
		'	<div id="image" align="center"> ' +
		'		<img src="{{this.id_default_image}}"/> ' +
		'	</div> ' +
		'	<p id="product-price">&#36;{{this.price}}</p>' + 
		'	<p id="product-name">{{this.name}}</p>' + 
		'</div>'
	),
	initialize: function () {
			
		 this.render();
    },
	render: function () {
		this.$el.append(this.template(this.model));
		return this;
	},
	events: {
		"dblclick #home-product" : "masking",
	},
	masking: function(){
		console.log("pindah ke details")
		if (!myScroll.moved){
			app.navigate('CategoryDetails/' + this.model.id, { trigger: true });
		}
	}
});