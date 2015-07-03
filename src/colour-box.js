import $ from 'jquery';

export default class ColourBox {
  constructor(el) {
    this.el = el;
    this.$el = $(el);
  }

  updateBackgroundColour(color) {
    this.el.style['background-color'] = color;
  }

  extractMouseCoordinates(event) {
    const { left, top } = this.$el.offset();
    const { height, width } = this.getDimensions();
    const x = (event.clientX - left) / width;
    const y = (event.clientY - top)  / height;

    return { x, y }
  }

  getDimensions() {
    return {
      height: this.$el.height(),
      width: this.$el.width()
    };
  }

  on(...args) {
    this.$el.on(...args);
  }
}
