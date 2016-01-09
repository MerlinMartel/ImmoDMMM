var depensesList;
var depensesListTotal = 1;

function getAllDepensesList(){
    var def1 = $.Deferred();
    getListByTitleItems("Dépenses", _spPageContextInfo.webAbsoluteUrl, "", "Date, Montant, Year, GestionnairesChoice, P", "",
        function (data) {
            depensesList = data.d.results;
            console.log(depensesList);
            if (depensesList.length === 0) {
                console.log("No Depense in Depenses\'s App");
                return;
            }
            def1.resolve();
        },errorHandler
    );
    return def1.promise();
}
var depensesDocLib;
var depensesDocLibTotal = 0;

function getAllDepensesDocLib(){
    var def1 = $.Deferred();
    getListByTitleItems("Depenses", _spPageContextInfo.webAbsoluteUrl, "", "Title, Prix, GestionnairesChoice, P", "",
        function (data) {
            depensesDocLib = data.d.results;
            console.log(depensesDocLib);
            if (depensesDocLib.length === 0) {
                console.log("No Depense in Depenses\'s App");
                return;
            }
            def1.resolve();
        },errorHandler
    );
    return def1.promise();
}

var remboursementArray;
function getAllRemboursement(){
    var def1 = $.Deferred();
    getListByTitleItems("Remboursement", _spPageContextInfo.webAbsoluteUrl, "", "Title, Montant, GestionnairesChoice", "",
        function (data) {
            remboursementArray = data.d.results;
            console.log(remboursementArray);
            if (remboursementArray.length === 0) {
                console.log("No remboursement in remboursement\'s App");
                return;
            }
            def1.resolve();
        },errorHandler
    );
    return def1.promise();
}

var managerArray;
function getAllManager(){
    var def1 = $.Deferred();
    getListByTitleItems("Gestionnaires", "https://mm3mm3.sharepoint.com/sites/immoDMMM", "", "id, Title, FirstName", "",
        function (data) {
            managerArray = data.d.results;
            console.log(managerArray);
            if (managerArray.length === 0) {
                console.log("No Manager in Manager\'s App");
                return;
            }
            def1.resolve();
        },errorHandler
    );
    return def1.promise();
}

var depenseListMerlinTotal = 0;
var depenseListDeniseTotal = 0;
var depenseDocLibMerlinTotal = 0;
var depenseDocLibDeniseTotal = 0;
function calcultateDepense(){
    // --------- Dépense List ----------

    //-------- Dépense List Merlin ----------

    var depenseListMerlinArray = depensesList.filter(function(item){
       return (item.GestionnairesChoice == "Merlin Martel" && item.P != true)
    });
    $.each(depenseListMerlinArray, function(index,item) {
        depenseListMerlinTotal = depenseListMerlinTotal + item.Montant;
    });
    console.log("Depense List Merlin en $ : " + depenseListMerlinTotal);

    //-------- Dépense  List Denise ---------

    var depenseListDeniseArray = depensesList.filter(function(item){
        return (item.GestionnairesChoice == "Denise Martel" && item.P != true)
    });


    $.each(depenseListDeniseArray, function(index,item) {
        depenseListDeniseTotal = depenseListDeniseTotal + item.Montant;
    });
    console.log("Depense List Denise en $ : " + depenseListDeniseTotal);


    //--------- Dépense DocLib --------

    //-------- Dépense DocLib Merlin ----------

    var depenseDocLibMerlinArray = depensesDocLib.filter(function(item){
        return (item.GestionnairesChoice == "Merlin Martel" && item.P != true)
    });


    $.each(depenseDocLibMerlinArray, function(index,item) {
        depenseDocLibMerlinTotal = depenseDocLibMerlinTotal + item.Prix;
    });
    console.log("Depense DocLib Merlin en $ : " + depenseDocLibMerlinTotal);

    //-------- Dépense  DocLib Denise ----------

    var depenseDocLibDeniseArray = depensesDocLib.filter(function(item){
        return (item.GestionnairesChoice == "Denise Martel" && item.P != true)
    });

    $.each(depenseDocLibDeniseArray, function(index,item) {
        depenseDocLibDeniseTotal = depenseDocLibDeniseTotal + item.Prix;
    });
    console.log("Depense DocLib Denise en $ : " + depenseDocLibDeniseTotal);

    //-------- Dépense Total ----------
    $.each(depensesList, function(index,item) {
        depensesListTotal = depensesListTotal + item.Montant;
    });
    console.log(depensesListTotal);
    $.each(depensesDocLib, function(index,item) {
        depensesDocLibTotal = depensesDocLibTotal + item.Prix;
    });
    console.log(depensesDocLibTotal);
}

var remboursementTotal = 0;

var remboursementMerlinTotal = 0;
var remboursementDeniseTotal = 0;
function calculateRemboursement(){

    var remboursementMerlinArray = remboursementArray.filter(function(item){
        return (item.GestionnairesChoice == "Merlin Martel")
    });
    $.each(remboursementMerlinArray, function(index,item) {
        remboursementMerlinTotal = remboursementMerlinTotal + item.Montant;
    });
    console.log("Remboursement Merlin total : " + remboursementMerlinTotal);

    var remboursementDeniseArray = remboursementArray.filter(function(item){
        return (item.GestionnairesChoice == "Denise Martel")
    });
    $.each(remboursementDeniseArray, function(index,item) {
        remboursementDeniseTotal = remboursementDeniseTotal + item.Montant;
    });
    console.log("Remboursement Denise total : " + remboursementDeniseTotal);
}


var divImmodmmmDepense;
var divDepensesListTotal;
var divDepensesDocLibTotal;
var divDepensesTotal;
var depensesTotal;

function displayRemboursement() {
    var remboursementMerlin = 0;
    var remboursementDenise = 0;
    remboursementMerlin = depenseListMerlinTotal + depenseDocLibMerlinTotal - remboursementMerlinTotal;
    remboursementDenise = depenseListDeniseTotal + depenseDocLibDeniseTotal - remboursementDeniseTotal;
    remboursementMerlin = remboursementMerlin.toFixed(2);
    remboursementDenise = remboursementDenise.toFixed(2);


    divImmodmmmDepense = $("#immodmmmDepense");
    divRemboursementDenise = $("<div>", {
        class: "Remboursement",
        text: "Remboursement Denise : " + remboursementDenise
    });
    divImmodmmmDepense.append(divRemboursementDenise);
    divRemboursementMerlin = $("<div>", {
        class: "Remboursement",
        text: "Remboursement Merlin : " + remboursementMerlin
    });
    divImmodmmmDepense.append(divRemboursementMerlin);
}

$(document).ready(function(){
    var promise1 = getAllDepensesList();
    var promise2 = getAllDepensesDocLib();
    var promise3 = getAllRemboursement();

    $.when(promise1, promise2, promise3).done(function(results){
        getAllDepensesList();
        getAllDepensesDocLib();
        getAllRemboursement();
        getAllManager();
        calcultateDepense();
        calculateRemboursement();
        displayRemboursement();

    });

});