require.config({
  paths: {
    templates : '../templates',
    text: '//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.5/text.min',
    jquery: '//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min',
    underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.1/underscore-min',
    backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    }
  }
});

require([
  'views/app'
], function(AppView){
  new AppView();
});
