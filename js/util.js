(function() {

  var Util = {};

  
  Util.clawbackLoadAll = function(error,entries) { 
    console.log("I am the loadAll callback"); 
    if(error) { 
      console.log("ERROR! "+error); 
    } else {
      EntryModel.allTheEntries = JSON.parse(entries);
      console.log(EntryModel.allTheEntries.length+" entries have been fetched: "); 
      console.log(EntryModel.allTheEntries);
    } 
  };




  window.Util = Util;

})();
