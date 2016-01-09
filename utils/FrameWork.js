function errorHandler(sender, args) {
    //sharePointReady();
    console.log('Error: ' + args.get_message());
}
function getListByTitleItems(listName, siteurl, filter, select, order, done, fail) {

    if (typeof(filter) !== 'undefined') filter = "?$Filter=" + filter;
    if (typeof(select) !== 'undefined') select = "&$Select=" + select;
    if (typeof(order) !== 'undefined') order = "&$orderby=" + order;

    var restUrl = siteurl +
        "/_api/web/lists/getbytitle('" + listName + "')/items" +
        filter +
        select +
        order+
        "&$top=5000";
    console.log ("getListItems: restUrl=" + restUrl);

    $.ajax({
        url: restUrl,
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
            done(data);
        },
        failure: function (data) {
            fail(data);
        }
    });
}
function getListByGuidItems(listName, siteurl, filter, select, order, done, fail) {

    if (typeof(filter) !== 'undefined') filter = "?$Filter=" + filter;
    if (typeof(select) !== 'undefined') select = "&$Select=" + select;
    if (typeof(order) !== 'undefined') order = "&$orderby=" + order;

    var restUrl = siteurl +
        "/_api/web/lists('" + listName + "')/items" +
        filter +
        select +
        order+
        "&$top=5000";
    console.log ("getListItems: restUrl=" + restUrl);

    $.ajax({
        url: restUrl,
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
            done(data);
        },
        failure: function (data) {
            fail(data);
        }
    });
}
function getListItemByID(listGuid, siteurl, select, ID, done, fail) {

        if (typeof(select) !== 'undefined') select = "?$Select=" + select;

    var restUrl = siteurl +
        "/_api/web/lists(guid'" + listGuid + "')/getItemById(" + ID + ")" + select;
    console.log ("getItemById: restUrl=" + restUrl);

    $.ajax({
        url: restUrl,
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
            done(data);
        },
        failure: function (data) {
            fail(data);
        }
    });
}