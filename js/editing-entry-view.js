(function() {

  var EditingEntryView = {};

  /* Renders a view to allow the user to edit an entry. Requires the $entry
   * element and an object representing the active entry. */
  EditingEntryView.render = function($entry, activeEntryData) {
  	console.log("EditingEntryView.render() has been invoked");

    var optionsForRenderEntry = { editing:true,
    							  entries:null,
    							  activeEntryData:activeEntryData
     							 };
	var retval = Templates.renderEntry(optionsForRenderEntry);

    console.log("rendered: ");
    console.log(retval);

    $entry.html(retval);	// stick it in the DOM
  };

  window.EditingEntryView = EditingEntryView;

})();
