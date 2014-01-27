
//Cart model
var cartModel = Backbone.Model.extend({
	defaults: {
		items : []
	},
	addToCart : function (item){
		
		if(this.cekIfIdExisting(item.id)){
			this.plusQty(item.id)
		}else{
			this.attributes.items.push(item);
		}
	},
	totalPrice: function (){
		var mLength = this.attributes.items.length,
			mData = this.attributes.items,
			mTotalPrice = 0
			
		if(mLength>=1){
			for (var i in mData) {
				console.log(mData[i].qty)
				console.log(mData[i].price)
				mTotalPrice = mTotalPrice + (mData[i].qty * mData[i].price)
			}
		}
		
		console.log(mTotalPrice)
		return mTotalPrice;
	},
	plusQty: function (id){
		var mLength = this.attributes.items.length,
		    mData = this.attributes.items
			
		if(mLength>=1){
			for (var i = 0; i < mLength; i++) {
				if(mData[i].id == id){
					newQty = mData[i].qty + 1;
					this.attributes.items[i].qty = newQty
				}
			}
		}
		console.log(this.attributes.items)
		return newQty;
		
	},
	minusQty: function (id){
		var mLength = this.attributes.items.length,
		    mData = this.attributes.items
			
		if(mLength>=1){
			for (var i = 0; i < mLength; i++) {
				if(mData[i].id == id){
					if(mData[i].qty > 0){
						newQty = mData[i].qty - 1;
						this.attributes.items[i].qty = newQty
					}
				}
			}
		}	
		console.log(this.attributes.items)
		return newQty;
	},
	cekIfIdExisting: function (id){
		var mLength = this.attributes.items.length,
		    mData = this.attributes.items,
			ifExist = false
			
		if(mLength>=1){
			for (var i = 0; i < mLength; i++) {
				if(mData[i].id == id){
					ifExist = true
				}
			}
		}
		
		return ifExist;
	}
});

var cart = new cartModel();

//user login
var userAuthLog = Backbone.Model.extend({
	url: "http://localhost:8080/Project/appstore/api/auth",
	defaults:{
		"user":"",
		"password":"",
		"isLogin":0,
		"mError":""
	}
});

var UserAuthLog = Backbone.Collection.extend({
	url: "http://localhost:8080/Project/appstore/api/auth",
	model:userAuthLog
});

var userAuth = new UserAuthLog();

