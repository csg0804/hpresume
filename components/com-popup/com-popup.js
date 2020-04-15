Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  data: {
    show: false
  },
  properties: {
    className: {
      type: String,
      value: ""
    },
    show: {
      type: Boolean,
      value: false
    },
    position: {
      type: String,
      value: 'bottom'
    },
    mask: {
      type: Boolean,
      value: true
    },
    animation: {
      type: Boolean,
      value: true
    },
    zIndex: {
      type: Number,
      value: 1000
    },
    disableScroll: {
      type: Boolean,
      value: true
    }
  },
  methods: {
    onMaskTap: function onMaskTap() {
      this.setData({ show: false });
    }
  }
});