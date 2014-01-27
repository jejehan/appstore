RAD.view("view.keranjang", RAD.Blanks.ScrollableView.extend({
	url:'app/views/keranjang_konfirmasi/keranjang/keranjang.html',
	events:{
		'click .keranjang' : 'addUser',
		'click .qtyplus' : 'qtyPlus',
		'click .qtyminus' : 'qtyMinus',
	},
	onStartAttach:function(){
		this.bindModel(this.model);
	},
	model : cart,
	cekOut : function (event) {
		
	},
	qtyPlus : function (e) {
		var $id = $(e.currentTarget),
			id = $id.data('id'),
			newQty = cart.plusQty(id),
			oTotalPrice= cart.totalPrice()
		
		$(".quantity" + id).text(newQty);
		$(".totalPrice").text(numberFormater(oTotalPrice));
	},
	qtyMinus : function (e) {
		var $id = $(e.currentTarget),
			id = $id.data('id'),
			newQty = cart.minusQty(id),
			oTotalPrice= cart.totalPrice()
		
		$(".quantity" + id).text(newQty);
		$(".totalPrice").text(numberFormater(oTotalPrice));
	},
}),false)