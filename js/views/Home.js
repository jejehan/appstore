var MainView = Backbone.View.extend({
	render: function (){
		this.bannerItemModel = new BannerItem();
		this.bannerView = new BannerView(
			{
				model: this.bannerItemModel
			}
		);
		this.$el.html(this.bannerView.render().$el);
		
		var productList = new ProductCollection();
		productList.fetch({success: function(){
			console.log($(this.$el))
			console.log(this.$el)
			$("#wrapper").append(new ProductView({collection:productList}).el);
		}});
		console.log(this.$el)
		this.$el.append(new ProductView({collection:productList}).$el);
		return this;
	}
});