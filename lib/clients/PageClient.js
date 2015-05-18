var ChecklistClient = {
  getCollection: function(url){
    var params = {
      url: url,
      type: "get",
      data: { }
    };
    console.log("URL: " + params.url);
    return $.ajax(params);
  }
};

module.exports = ChecklistClient;
