(function() {

  var CreatingEntryView = {};

  /* Renders a view to allow the user to create an entry. Requires the $entry
   * element. */
  CreatingEntryView.render = function($entry) {
    console.log("CreatingEntryView.render() has been invoked");

    var optionsForRenderEntry = { creating:true,
    							  entries:null,
    							  activeEntryData:null
     							 };
	var retval = Templates.renderEntry(optionsForRenderEntry);

    console.log("rendered: ");
    console.log(retval);

    $entry.html(retval);	// stick it in the DOM
    var greenAddButton = document.querySelector('#entry').querySelector('button[class="green add"]');
    greenAddButton.addEventListener('click',function() {
    		console.log("Perrin here, on greenAdd");
    		var inputName = document.querySelector('#entry').querySelector('div[class="feature"]').querySelector('input[name="name"]');
    		var inputAddress = document.querySelector('#entry').querySelector('div[class="metadata"]').querySelector('div[class="address"]').querySelector('input[name="address"]');
    		var textareaDescription = document.querySelector('#entry').querySelector('div[class="metadata"]').querySelector('div[class="description"]').querySelector('textarea[name="description"]');
    		var entryToAdd = {name:inputName.value,
    						  address:inputAddress.value,
    						  description:textareaDescription.value
    						};
    		EntryModel.add(entryToAdd, function(error,entry) {
    				console.log("I am the callback for add, called from CreatingEntryView.render");
    				if (error) {	// add failed; display messsage in errdiv; stay in this view
    					console.log("ERROR! "+error);
      					// TODO this does not show up!
      					var errdiv = document.querySelector('div[class="error"]');
      					errdiv.innerHTML = response.text;	// no need to re-render after this, just leave
      					// TODO doesn't work
					} else {	// add went ok...
						console.log("add apparently went ok and returned...");
						console.log(entry);
						EntryView.render($entry,JSON.parse(entry));
					} // end of add went ok

    		});	// end of callback for EntryModel.add

    	});	// end of eventListener for ADD button

  };	// end of CreatingEntryView.render

  window.CreatingEntryView = CreatingEntryView;

})();
