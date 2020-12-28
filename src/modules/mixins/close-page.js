export default {
  methods: {
    close() {
      window.onbeforeunload = () => {};
      if (navigator.userAgent.indexOf('MSIE') > 0) {
        if (navigator.userAgent.indexOf('MSIE 6.0') > 0) {
          window.opener = null;
          window.close();
        } else {
          window.open('', '_top');
          window.top.close();
        }
      } else if (
        navigator.userAgent.indexOf('Firefox') > 0 ||
        navigator.userAgent.indexOf('Chrome') > 0
      ) {
        // 火狐和chrome不能直接使用js代码
        window.open('about:blank', '_self').close();
      } else {
        window.opener = null;
        window.open('', '_self', '');
        window.close();
      }
    }
  }
};
