module.exports = function(arr, key) {
  var h = {};
  if(arr && arr.forEach){
    arr.forEach( function(comment) {
      h[comment[key]] = comment;
    });
  }else{
    h = arr;
  }
  return h;
};
