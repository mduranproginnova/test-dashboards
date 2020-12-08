var useCase = 1;
var targetUrl = "/login";

// Pentaho service call.
var xmlHttp = new XMLHttpRequest();

xmlHttp.onreadystatechange = function() {
    if (xmlHttp.status === 200 && xmlHttp.responseURL.endsWith("/pentaho/Home")) {
        document.write("<script id =\"pentahoHeaderScript\" src=\"/pentaho/plugin/pentaho-cdf-dd/api/renderer/cde-embed.js\">\x3C/script>");
    }
}
xmlHttp.open("GET", "/pentaho/Home", false);
xmlHttp.send(null);
