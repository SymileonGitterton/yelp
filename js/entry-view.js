(function() {

  var EntryView = {};

  /* Renders an entry into the given $entry element. Requires the object
   * representing the active entry (activeEntryData). If this object is null,
   * picks the first existing entry. If no entry exists, this view will display
   * the CreatingEntryView. */
  EntryView.render = function($entry, activeEntryData) {
    console.log("EntryView.render() has been invoked for element...");
    console.log($entry);
    console.log("and activeEntry: ");
    console.log(activeEntryData);

    var optionsForRenderEntry = { viewing:true,
    							  entries:EntryModel.allTheEntries,
    							  activeEntryData:activeEntryData		//TODO need to be real activeEntry at some point...?
     							 };
    //var optionsForRenderEntry = { viewing:true,
    //							  entries:null,
    //							  activeEntryData:null		//TODO need to be real activeEntry at some point...?
    //							 };
	var retval = Templates.renderEntry(optionsForRenderEntry);

    console.log("rendered: ");
    console.log(retval);

    $entry.html(retval);	// stick it in the DOM
    //document.querySelector('#entry').innerHTML = retval;	// stick it in the DOM
  };

  window.EntryView = EntryView;

})();
