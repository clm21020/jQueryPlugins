$.Thumbnail = function(el){
  this.$el = $(el);
  this.$gutterImages = this.$el.find(".gutter-images");
  this.$images = this.$gutterImages.find("img");
  this.$activeImg = this.$images.first();
  this.gutterIdx = 0;
  this.activate(this.$activeImg);
  this.bindEvents();
  this.fillGutterImages();
};

$.Thumbnail.prototype.bindEvents = function() {
  this.$gutterImages.on("click", "img", this.clickHandler.bind(this));
  this.$gutterImages.on("mouseenter", "img", this.mouseEnterHandler.bind(this));
  this.$gutterImages.on("mouseleave", "img", this.mouseLeaveHandler.bind(this));
  this.$el.find(".gutter").on("click", "a", this.scrollHandler.bind(this));
};

$.Thumbnail.prototype.scrollHandler = function(event) {
  var $clicked = $(event.currentTarget);
  // debugger;
  if ($clicked.data('direction') === 'right') {
    this.gutterIdx = (this.gutterIdx + 1) % this.$images.length;
  } else {
    if (this.gutterIdx === 0) {
      this.gutterIdx = this.$images.length - 1;
    } else {
      this.gutterIdx--;
    }
  }

  this.fillGutterImages();
};

$.Thumbnail.prototype.fillGutterImages = function() {
  this.$gutterImages.empty();
  for (var i = this.gutterIdx; i < (this.gutterIdx + 5); i++) {
    var $currentThumbnail = $(this.$images[i % this.$images.length]);
    this.$gutterImages.append($currentThumbnail);
  }
};

$.Thumbnail.prototype.clickHandler = function(event) {
  var $currentImg = $(event.currentTarget);
  this.$activeImg = $currentImg;
  this.activate(this.$activeImg);
};
$.Thumbnail.prototype.mouseEnterHandler = function(event) {
  var $currentImg = $(event.currentTarget);
  this.activate($currentImg);
};
$.Thumbnail.prototype.mouseLeaveHandler = function(event) {
  this.activate(this.$activeImg);
};

$.Thumbnail.prototype.activate = function($img) {
  var $clonedImg = $img.clone();
  this.$el.find(".active").html($clonedImg);
};

$.fn.thumbnails = function() {
  return this.each(function(){
    new $.Thumbnail(this);
  });
};
