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
    var tealUpdateButton = document.querySelector('#entry').querySelector('button[class="teal update"]');
    tealUpdateButton.addEventListener('click',function() {
    		console.log("Perrin here, on tealUpdate");
    		var inputName = document.querySelector('#entry').querySelector('div[class="feature"]').querySelector('input[name="name"]');
    		var inputAddress = document.querySelector('#entry').querySelector('div[class="metadata"]').querySelector('div[class="address"]').querySelector('input[name="address"]');
    		var textareaDescription = document.querySelector('#entry').querySelector('div[class="metadata"]').querySelector('div[class="description"]').querySelector('textarea[name="description"]');
    		activeEntryData.name = inputName.value;
    		activeEntryData.address = inputAddress.value;
    		activeEntryData.description = textareaDescription.value;
    		EntryModel.update(activeEntryData, function(error,entry) {
    				console.log("I am the callback for update, called from EditingEntryView.render");
    				if (error) {	// update failed; display messsage in errdiv; stay in this view
    					console.log("ERROR! "+error);
      					// TODO this does not show up!
      					var errdiv = document.querySelector('div[class="error"]');
      					errdiv.innerHTML = response.text;	// no need to re-render after this, just leave
      					// TODO doesn't work
					} else {	// update went ok...
						console.log("update apparently went ok");
						EntryView.render($entry,activeEntryData);
					} // end of update went ok

    		});	// end of callback for EntryModel.update

    	});	// end of eventListener for UPDATE button

  };  // end of EditingEntryView.render()

  window.EditingEntryView = EditingEntryView;

})();
