
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
exports.control = function(req, res){
  var sessid = req.params.sessid;
  res.render('control', {
    sessid: sessid
  });
};
