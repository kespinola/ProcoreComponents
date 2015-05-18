var _ = require("underscore");

var SequenceUML = {
  init: function(){
    this.logger = [];
    this.resetLog();
  },
  log: function(caller, callee, line, description) {
    this._handleLogAction(caller, callee, description);
    var umlLine = [caller, line, callee, ": ", description].join("");
    console.log(umlLine);
    this.logger.push(umlLine);
  },
  _handleLogAction: function(caller, callee, description) {
    caller === "lists_synchronizer" && callee === "lists_synchronizer"
    && description === "syncResource" && (this.resetLog());
    caller === "lists_synchronizer" && callee === "lists_synchronizer"
    && description === "syncResourceDone" && (this.showLog());
  },
  showLog: function() {
    console.log(this.logger.join("\n"));
  },
  resetLog: function() {
    this.logger = [];
    this.logger.push("========== UML DUMP ============");
    this.logger.push("title FluxFlair Sequence Diagram");
  }
};

var UML = function(UMLType) {
  var uml = _.extend(UMLType);
  uml.init();
  return uml;
}

module.exports = UML(SequenceUML);
