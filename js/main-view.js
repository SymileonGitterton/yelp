(function() {

  var MainView = {};

  /* Renders the main area, showing entries. */
  MainView.render = function($body) {
    var $entry = $body.find('#entry');
    console.log("Main view is a-renderin'");
    EntryView.render($entry, null);
  };

  window.MainView = MainView;

})();
