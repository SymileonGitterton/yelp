(function() {

  //var EntryModel = {allTheEntries:[], operationPending:false};
  var EntryModel = {};

  var ENTRIES_URL = '/entries';
  var STATUS_OK = 200;


  /* Loads all entries from the server.
   *
   * Calls: callback(error, entries)
   *  error -- the error that occurred or NULL if no error occurred
   *  entries -- an array of entries
   */
  EntryModel.loadAll = function(callback) {
    // 1) create an XMLHttpRequest object
    var request = new XMLHttpRequest();
    
    // 2) Handle the 'load' event with this code:
    request.addEventListener('load', function() {                 // callback for when load completes from server
            if (request.status != STATUS_OK) {
              callback(request.responseText);
            } else {
              callback(null,request.responseText);
            }
        });

    // 3) open a URL with the correct request type
    request.open('GET', ENTRIES_URL);

    // 4) set the content-type header, if this is a POST

    // 5) send the request to the server, with parameters if a POST
    request.send(); 
    // done; exit and await 'load' callback
  };



  /* Adds the given entry to the list of entries. The entry must *not* have
   * an id associated with it.
   *
   * Calls: callback(error, entry)
   *  error -- the error that occurred or NULL if no error occurred
   *  entry -- the entry added, with an id attribute
   */
  EntryModel.add = function(entry, callback) {
    // 1) create an XMLHttpRequest object
    var request = new XMLHttpRequest();
    
    // 2) Handle the 'load' event with this code:
    request.addEventListener('load', function() {                 // callback for when load completes from server
            if (request.status != STATUS_OK) {
              callback(request.responseText);
            } else {
              callback(null,request.responseText);
            }
        });

    // 3) open a URL with the correct request type
    request.open('POST', ENTRIES_URL);

    // 4) set the content-type header, if this is a POST
    request.setRequestHeader("Content-type", "application/json");

    // 5) send the request to the server, with parameters if a POST
    request.send(JSON.stringify(entry)); 

    // done; exit and await 'load' callback
  };



  /* Updates the given entry. The entry must have an id attribute that
   * identifies it.
   *
   * Calls: callback(error)
   *  error -- the error that occurred or NULL if no error occurred
   */
  EntryModel.update = function(entry, callback) {
    // 1) create an XMLHttpRequest object
    var request = new XMLHttpRequest();
    
    // 2) Handle the 'load' event with this code:
    request.addEventListener('load', function() {                 // callback for when load completes from server
            if (request.status != STATUS_OK) {
              callback(request.responseText);
            } else {
              callback(null,request.responseText);
            }
        });

    // 3) open a URL with the correct request type
    request.open('POST', ENTRIES_URL+"/"+entry.id);

    // 4) set the content-type header, if this is a POST
    request.setRequestHeader("Content-type", "application/json");

    // 5) send the request to the server, with parameters if a POST
    request.send(JSON.stringify(entry)); 

    // done; exit and await 'load' callback
  };

  /* Deletes the entry with the given id.
   *
   * Calls: callback(error)
   *  error -- the error that occurred or NULL if no error occurred
   */
  EntryModel.remove = function(id, callback) {
    // 1) create an XMLHttpRequest object
    var request = new XMLHttpRequest();
    
    // 2) Handle the 'load' event with this code:
    request.addEventListener('load', function() {                 // callback for when load completes from server
            if (request.status != STATUS_OK) {
              callback(request.responseText);
            } else {
              callback(null);
            }
        });

    // 3) open a URL with the correct request type
    request.open('POST', ENTRIES_URL+"/"+id+"/delete");

    // 4) set the content-type header, if this is a POST
    request.setRequestHeader("Content-type", "application/json");

    // 5) send the request to the server, with parameters if a POST
    request.send(); 

    // done; exit and await 'load' callback
  };


  //EntryModel.loadAll(Util.clawback);  // shoiuld fill EntryModel.allTheEntries
  window.EntryModel = EntryModel;

})();
