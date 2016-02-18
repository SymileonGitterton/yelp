(function() {

  var EntryView = {};

  /* Renders an entry into the given $entry element. Requires the object
   * representing the active entry (activeEntryData). If this object is null,
   * picks the first existing entry. If no entry exists, this view will display
   * the CreatingEntryView. */
  EntryView.render = function($entry, activeEntryData) {
    console.log("EntryView.render() has been invoked for activeEntry...");
    console.log(activeEntryData);

	console.log("EntryModel.allTheEntries at this time is ");
	console.log(EntryModel.allTheEntries);

  	// attempt to pull all the data from the server
  	EntryModel.loadAll(function(error,entries) {
  		console.log("I am the loadAll callback as called from EntryView.render");
    	if(error) { 
      		console.log("ERROR! "+error);
      		EntryModel.allTheEntries = [];						// fail - delete local entries, go to create entry
      		CreatingEntryView.render($entry);
      		return;
    	} else {	// no error, entries were fetched ok
      		EntryModel.allTheEntries = JSON.parse(entries);
      		console.log("loadAll apparently went well and returned "+EntryModel.allTheEntries.length+" entries...")
      		console.log(entries)
      		console.log("EntryModel.allTheEntries is now...");
      		console.log(EntryModel.allTheEntries);
    		if (EntryModel.allTheEntries.length === 0) {
    			CreatingEntryView.render($entry)				// 0 entries, so need the create screen
    			return;											// don't come back here
    		} else if (activeEntryData == null) {				// we have entries, but we're not told which to show
    			activeEntryData = EntryModel.allTheEntries[0];	// so show the first one
    		}
    		// at this point we have at least one entry in the set and a a valid activeEntryData
   			var optionsForRenderEntry = { viewing:true,
    						      		  entries:EntryModel.allTheEntries,
    							  		  activeEntryData:activeEntryData
     									};
    		var retval = Templates.renderEntry(optionsForRenderEntry);	// so render and show it
    		console.log("arguments for render: ");
    		console.log(optionsForRenderEntry);
    		console.log("rendered: ");
    		console.log(retval);
    		$entry.html(retval);	// stick it in the DOM

    		// NEW button - go to CreatingEntryView
    		var greenNewButton = document.querySelector('#entry').querySelector('button[class="green new"]');
    		greenNewButton.addEventListener('click',function() {
    				console.log("Perrin here, on greenNew");
    				CreatingEntryView.render($entry);
    			});

    		// EDIT button - go to EditingEntryView
    		var tealEditButton = document.querySelector('#entry').querySelector('button[class="teal edit"]');
    		tealEditButton.addEventListener('click',function() {
    				console.log("Perrin here, on blue!");
    				EditingEntryView.render($entry, activeEntryData);
    			});

    		// DELETE button - kill item, return to edit or create view
    		var redDeleteButton = document.querySelector('#entry').querySelector('button[class="red delete"]');
    		redDeleteButton.addEventListener('click',function() {
    				console.log("Perrin here, on RED! RED! DELETE!");

    				//if (EntryModel.allTheEntries.length === 1)	{ // just this entry remaining...
    				EntryModel.remove(activeEntryData.id, function(error) {
  							console.log("I am the remove callback as called from EntryView.render()"); 
    						if(error) { 
      							console.log("ERROR! "+error);
      							// TODO move to jquery;
      							// TODO this does not show up!
      							var errdiv = document.querySelector('div[class="error"]');
      							errdiv.innerHTML = response.text;	// no need to re-render after this, just leave
      																// TODO doesn't work
      							// return?
    						} else { // good removal...
    							// now I need to reload the entries again???
    							EntryModel.loadAll(function(error,entries) {
  									console.log("I am the loadAll callback as called after DELETE");
    								if (error) {
    									console.log("ERROR! "+error);
      									EntryModel.allTheEntries = [];	// fail - delete local entries, go to create entry
      									var errdiv = document.querySelector('div[class="error"]');
      									errdiv.innerHTML = response.text;	// no need to re-render after this, just leave
      																		// TODO doesn't work
      									CreatingEntryView.render($entry);
      									return;
    								} else {	// no error, entries were fetched ok
      									EntryModel.allTheEntries = JSON.parse(entries);
      									console.log(EntryModel.allTheEntries.length+" entries have been fetched: "); 
      									console.log(EntryModel.allTheEntries);
    									if (EntryModel.allTheEntries.length === 0) {
    										CreatingEntryView.render($entry)				// 0 entries, so need the create screen
    										return;											// don't come back here
    									} else {											// entry 0 exists, use thast
    										EntryView.render($entry,EntryModel.allTheEntries[0]);
										}
    								} // end of entries fetched ok after delete
    							}); 	// end of callback for loadAll after remove
    						}	// end of good remove
    				});	// end of callback for remove

    			});	// end of eventListener for delete button


			var dropdownSelect = document.querySelector('#entry').querySelector('div[class="feature"]').querySelector('div[class="dropdown"]').querySelector('select');
			dropdownSelect.addEventListener('change', function() {
						console.log("Perrin here, on dropdown!");
						console.log("id "+dropdownSelect.value+" has been chosen");
						console.log("EntryModel is");
						console.log(EntryModel);
						var theChosenOne = null;
						for (var i=0;i<EntryModel.allTheEntries.length;i++)
							if(EntryModel.allTheEntries[i].id === dropdownSelect.value)
								theChosenOne = EntryModel.allTheEntries[i];
						EntryView.render($entry,theChosenOne);
					}); //end of callback for dropdown

  			}	// end of good entries fetched

  		});	// end of callback given to loadAll

	}	// end of EntryView.render()

  window.EntryView = EntryView;

})();
