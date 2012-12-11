/**
 *
 * @author paulshin
 */
(function() {
  var plugin = {
    labjs: 'http://nodeman.org/javascripts/LAB.min.js',
    jquery: 'http://nodeman.org/javascripts/jquery.min.js'
  };

  loadScript(plugin.labjs, function() {
    $LAB
      .script(function() {
        if (typeof jQuery !== 'undefined') return;
        return plugin.jquery
      }).wait()
      .script('http://localhost:3001/navigator_process.js?' + (+new Date()))
      ;
  });

  // -----------------------------------------------------------------------//

  function loadScript(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState) {  //IE
      script.onreadystatechange = function() {
        if (script.readyState == "loaded" || script.readyState == "complete") {
          script.onreadystatechange = null;

          if( typeof callback == 'undefined' ) return;
          callback();
        }
      };
    } else {
      script.onload = function() {
        if( typeof callback == 'undefined' ) return;
        callback();
      };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  }
})();
