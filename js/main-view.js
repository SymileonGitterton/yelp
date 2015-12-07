var MainView = {};

/* Renders the main area, showing entries. */
MainView.render = function($body) {
  var $entry = $body.find('#entry');
  EntryView.render($entry, null);
};
