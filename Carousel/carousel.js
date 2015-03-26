$.Carousel = function(el){
  this.$el = $(el);
  this.activeIdx = 0;
  this.$items = this.$el.find("img");
  this.$items.eq(0).addClass("active");
  this.eventBinder();
  this.transitioning = false;
};

$.Carousel.prototype.slideLeft = function(event) {
  if (this.transitioning === true) {
    return;
  }
  this.transitioning = true;
  var $prevImg = this.$items.eq(this.activeIdx);
  $prevImg.addClass("right");
  if (this.activeIdx === 0) {
    this.activeIdx = this.$items.length - 1;
  } else {
    this.activeIdx--;
  }

  var $nextImg = this.$items.eq(this.activeIdx);
  $nextImg.addClass("left active");
  setTimeout(function () {
    $nextImg.removeClass("left");
  }, 0);
  $prevImg.one("transitionend", function(){
    $prevImg.removeClass("active");
    $prevImg.removeClass("right");
    this.transitioning = false;
  }.bind(this));
};

$.Carousel.prototype.slideRight = function(event) {
  if (this.transitioning === true) {
    return;
  }
  this.transitioning = true;
  var $prevImg = this.$items.eq(this.activeIdx);
  $prevImg.addClass("left");
  this.activeIdx = (this.activeIdx + 1) % this.$items.length;
  var $nextImg = this.$items.eq(this.activeIdx);
  $nextImg.addClass("right active");
  setTimeout(function () {
    $nextImg.removeClass("right");
  }, 0);

  $prevImg.one("transitionend", function(){
    $prevImg.removeClass("active");
    $prevImg.removeClass("left");
    this.transitioning = false;
  }.bind(this));
};

// $.Carousel.prototype.slide = function(num){
//
// };

$.Carousel.prototype.eventBinder = function() {
  this.$el.on('click', 'a', function(event) {
    if (event.currentTarget.className === 'slide-left') {
      this.slideLeft(event);
    } else if (event.currentTarget.className === 'slide-right') {
      this.slideRight(event);
    }
  }.bind(this));
};

$.fn.carousel = function () {
  return this.each(function () {
    new $.Carousel(this);
  });
};
