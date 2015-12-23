(function(window, document, undefined) {

  var Templates = {};

  /* Creates an HTMLElement to display an entry in editing, creating, or viewing mode.
   *
   * Arguments:
   * renderData -- a JavaScript object with the following keys
   *   activeEntryData: a JavaScript object with data for the active entry; this is null for
   *     the editing and creating pages
   *   viewing: boolean to render the entry viewing page
   *   editing: boolean to render the entry editing page
   *   creating: boolean to render the entry creating page
   *   entries: an array of entry objects; this renders the entry selection dropdown on the
   *     viewing page
   */
  Templates.renderEntry = function(renderData) {
    var activeEntryData = renderData.activeEntryData;

    var entryName = "";
    if (renderData.editing) {
      entryName = tag("input", {
        type: "text",
        name: "name",
        value: activeEntryData.name
      }, []);
    } else if (renderData.creating) {
      entryName = tag("input", {
        type: "text",
        name: "name"
      }, []);
    } else {
      entryName = tag("span", activeEntryData.name);
    }

    var dropdown = "";
    if (renderData.viewing) {
      var options = [
        tag("option", {value: "-1"}, "Pick location...")
      ];

      renderData.entries.forEach(function(entry) {
        var option = tag("option", {value: entry.id}, entry.name);
        options.push(option);
      });

      dropdown = tag("div", {class: "dropdown"}, [
        tag("button", ""),
        tag("select", options)
      ]);
    }

    var actions = "";
    if (renderData.editing) {
      actions = [
        tag("button", {class: "teal update"}, "Update")
      ];
    } else if (renderData.creating) {
      actions = [
        tag("button", {class: "green add"}, "Add")
      ];
    } else {
      actions = [
        tag("button", {class: "green new"}, "New"),
        tag("button", {class: "teal edit"}, "Edit"),
        tag("button", {class: "red delete"}, "Delete")
      ];
    }

    actions.push(tag("div", {class: "error"}, []));

    var address = "";
    if (renderData.editing) {
      address = tag("input", {
        type: "text",
        name: "address",
        value: activeEntryData.address
      }, []);
    } else if (renderData.creating) {
      address = tag("input", {
        type: "text",
        name: "address"
      }, []);
    } else {
      address = tag("span", activeEntryData.address);
    }

    var description = "";
    if (renderData.editing) {
      description = tag("textarea", {name: "description"}, activeEntryData.description);
    } else if (renderData.creating) {
      description = tag("textarea", {name: "description"}, []);
    } else {
      description = tag("span", activeEntryData.description);
    }

    var entryId = "";
    if (activeEntryData) {
      entryId = tag("input", {
        class: "id",
        type: "hidden",
        value: renderData.activeEntryData.id
      }, []);
    }

    return tag("div", [
      tag("div", {class: "map"}, []),
      tag("div", {class: "feature"}, [
        "Welcome to",
        tag("br", ""),
        entryName,

        dropdown,
        tag("br", ""),

        tag("div", {class: "actions"}, actions)
      ]),
      tag("div", {class: "metadata"}, [
        tag("div", {class: "address"}, [
          "Address:",
          tag("br", ""),
          address
        ]),

        tag("div", {class: "description"}, [
          "Description:",
          tag("br", ""),
          description
        ]),

        entryId
      ])
    ]);
  };

  /* Creates and returns an HTMLElement representing a tag of the given name.
   * attrs is an object, where the key-value pairs represent HTML attributes to
   * set on the tag. contents is an array of strings/HTMLElements (or just a single
   * string/HTMLElement) that will be contained within the tag.
   *
   * Note that attrs is an optional parameter, and can be ommitted.
   *
   * Examples:
   * tag("p", "A simple paragraph") => <p>A simple paragraph</p>
   * tag("a", {href: "/about"}, "About") => <a href="/about">About</a>
   *
   * tag("ul", tag("li", "First item")) => <ul><li>First item</li></ul>
   *
   * tag("div", [
   *   tag("h1", {"class": "headline"}, "JavaScript"),
   *   " is awesome, ",
   *   tag("span", "especially in CS42.")
   * ])
   * => <div>
   *      <h1 class="headline">JavaScript</h1>
   *      is awesome,
   *      <span>especially in CS42.</span>
   *    </div>
   */
  function tag(name, attrs, contents) {
    // attrs is optional
    if (!contents) {
      contents = attrs;
      attrs = [];
    }

    var element = document.createElement(name);
    for (var attr in attrs) {
      element.setAttribute(attr, attrs[attr]);
    }

    // If contents is a single string or HTMLElement, make it an array of one
    // element; this guarantees that contents is an array below.
    if (!(contents instanceof Array)) {
      contents = [contents];
    }

    contents.forEach(function(piece) {
      if (piece instanceof HTMLElement) {
        element.appendChild(piece);
      } else {
        // must create a text tag for a raw string
        element.appendChild(document.createTextNode(piece));
      }
    });

    return element;
  }

  window.Templates = Templates;

})(this, this.document);
