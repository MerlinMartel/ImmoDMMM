/**
 * Created by Merlin on 2015-02-08.
 */

var documentObject = new Array();
var params = {};
var IDDoc;
var HTML;

function getDocObject(){
    var def1 = $.Deferred();
    IDDoc = params.ID;
    getListItemByID("39676029-B0E2-414A-8103-4E5F22544562", _spPageContextInfo.webAbsoluteUrl, "EncodedAbsUrl", IDDoc,
    function (data) {
            documentObject = data.d;
            console.log("DocumentObject");
            console.log(documentObject);
        def1.resolve();
        },errorHandler
    );
    return def1.promise();
}
function addHTML(){
    console.log(HTML);
    HTML = "<object><embed src='" + documentObject.EncodedAbsUrl + "' height='600' width='800' type='application/pdf'></embed></object>";
    console.log(HTML);
    $("#PDF").append(HTML);

}
$(document).ready(function(){
    //get the parameter in the query string
    var regex = /[?#&]([^=#]+)=([^&#]*)/g,
        url = window.location.href,
        match;
    while (match = regex.exec(url)) {
        params[match[1]] = match[2];
    }


    var promise1 = getDocObject();
    $.when(promise1).done(function(results) {
        getDocObject();
        addHTML();
    });


});

//https://mm3mm3.sharepoint.com/sites/immoDMMM/1821Bennett/_api/web/lists(guid'39676029-B0E2-414A-8103-4E5F22544562')/getitembyid(867)?$select=EncodedAbsUrl
