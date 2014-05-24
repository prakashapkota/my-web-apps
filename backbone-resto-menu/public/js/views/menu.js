var MenuView = Backbone.View.extend({

	template: Handlebars.compile(
		'<ul>' + 
		'{{#each models}}<li><a href="#/menu-items/{{attributes.url}}">{{attributes.name}}</a></li>{{/each}}' +
		'</ul>'
	),

	initialize: function(){
		this.listenTo(this.collection, "reset", this.render);
		this.listenTo(this.collection, "add", this.render);
		this.listenTo(this.collection, "remove", this.render);
	},

	render: function () {
		this.$el.html(this.template(this.collection));
		return this;
	}

});

var family = [
	{
		first: "haha",
		last: "sharma"
	},
	{
		first: "rosha",
		last: "sharma"
	},
	{
		first: "tens",
		last: "lamo"
	}
];
family = $.grep(family, function(obj, index){
	
	return obj.last == "sharma";
})


