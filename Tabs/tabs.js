$.Tabs = function (el) { //el = ul
  this.$el = $(el);
  var contentTabsId = this.$el.data("content-tabs");
  this.$contentTabs = $(contentTabsId);
  this.$activeTab = this.$contentTabs.find(".active");
  this.bindEvents();
};

$.fn.tabs = function () {
  return this.each(function () {
    new $.Tabs(this);
  });
};

$.Tabs.prototype.bindEvents = function(){
  this.$el.on("click", "a", this.clickTab.bind(this));
};

$.Tabs.prototype.clickTab = function(event){
  event.preventDefault;
  this.$el.find('a').removeClass("active");
  this.$activeTab.removeClass("active");
  this.$activeTab.addClass("transitioning").one("transitionend", function(){
    this.$activeTab.removeClass("transitioning");
    var $clickedLink = $(event.currentTarget);
    $clickedLink.addClass('active');
    var contentId = $clickedLink.attr('href');
    this.$activeTab = this.$contentTabs.find(contentId).addClass('active transitioning');
    setTimeout(function() {
      this.$activeTab.removeClass('transitioning');
    }.bind(this), 0);
  }.bind(this));
};
