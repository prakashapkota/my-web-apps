var AppRouter = Backbone.Router.extend({
	routes: {
		"": "list",
		"menu-items/:item" : "itemDetails",
	},

	initialize: function  () {
		//Collection
		this.menuItems = new MenuItems();
		this.menuItems.fetch();

		//model
		this.menuItemModel = new MenuItem();
		this.menuItemView = new MenuItemDetails(
			{
				model: this.menuItemModel
			}
		);

		this.menuView = new MenuView({collection: this.menuItems});
	},

	list: function () {		
		$('#app').html(this.menuView.render().el);
	},

	itemDetails: function (item) {		
		this.menuItemView.model = this.menuItems.get(item);
		$('#app').html(this.menuItemView.render().el);
	}

});

var app = new AppRouter();

$(function(){
	Backbone.history.start();
});