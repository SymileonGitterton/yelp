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
    		
    	});
  };

  window.CreatingEntryView = CreatingEntryView;

})();
