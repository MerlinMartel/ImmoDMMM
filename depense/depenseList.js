/**
 * Created by Merlin on 2015-02-28.
 */
/**
 * @param {{_spPageContextInfo:string}} data
 * @param {{webAbsoluteUrl:string}} data
 */
//todo trouver une manière de faire plus clean
var year = "2015.00000000000";
var depensesDocLib;
function getAllDepensesDocLib(){
    var def1 = $.Deferred();
    getListByTitleItems("Depenses", _spPageContextInfo.webAbsoluteUrl, "", "ID, FileLeafRef, FileRef, Valide, Date1, Title, Prix, GestionnairesChoice, P, RCol, Year, abb42f33a9624f5ca80efef7362d4ef5, mb224476f17843fca98a3d3839819897", "",
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
    return def1.promise(depensesDocLib);
}
function GetDepenseCurrentYear(Depenses){
    var x = Depenses.filter(function(item){
        return (item.Year == year && item.FileRef.indexOf('/Gab/') == -1);  //remove gab stuff
    });


    console.log('GetDepenseCurrentYear');
    console.log(x);
    x = x.sort(function(a, b){
        var a1 = a.Date1, b1 = b.Date1;
        //return a1 - b1;
        return a1 > b1? 1: -1;
    });
    return x;
}
function displayDepense(depenseCurrentYear){
    var divImmodmmmDepenseList = $("#immodmmmDepenseList");
    $.each(depenseCurrentYear,function(index,item) {
        var depenseItem = $("<div>", {
            class: "depenseItem",
            id:item.ID
        });
        divImmodmmmDepenseList.append(depenseItem);
        //Si c'est validé, mettre une class pour montrer que c'est validé
        if (item.Valide == true){
            var id = item.ID;
            $("#" + id).addClass("Validated");
        }
        if (item.abb42f33a9624f5ca80efef7362d4ef5 == null || item.mb224476f17843fca98a3d3839819897 == null){
            id = item.ID;
            $("#" + id).addClass("MissingInfo");
        }
        var dID = $("<div>", {
            class: "dID",
            text: item.ID
        });
        depenseItem.append(dID);
        var dLienPropriete = $("<a>", {
            class: "dLienPropriete",
            href: "https://mm3mm3.sharepoint.com/sites/immoDMMM/1821Bennett/Depenses/Forms/EditForm.aspx?ID=" + item.ID + "&Source=https://mm3mm3.sharepoint.com/sites/immoDMMM/1821Bennett/Pages/depenseList.aspx",
            text: "Propriete"
        });
        depenseItem.append(dLienPropriete);
        var dFileName = $("<div>", {
            class: "dFileName"
        });
        var dFileNameLink = $("<a>", {
            class: "dFileNameLink",
            text: item.FileLeafRef,
            href: item.FileRef,
            target:"_blank"
        });
        dFileName.append(dFileNameLink);
        depenseItem.append(dFileName);
        var dPrix = $("<div>", {
            class: "dPrix",
            text: item.Prix
        });
        depenseItem.append(dPrix);
        var dGestionnaires = $("<div>", {
            class: "dGestionnaires",
            text: item.GestionnairesChoice
        });
        depenseItem.append(dGestionnaires);
        var catImpot = item.abb42f33a9624f5ca80efef7362d4ef5;
        if (catImpot != null){
            catImpot = catImpot.substring(0, catImpot.indexOf("|"));
        }
        if (catImpot == null){
            catImpot = 'N/A';
        }
        var dCatImpot = $("<div>", {
            class: "dCatImpot",
            text: catImpot
        });
        depenseItem.append(dCatImpot);
        var logement = item.mb224476f17843fca98a3d3839819897;
        if (logement != null){
            logement = logement.substring(0, logement.indexOf("|"));
        }
        if (logement == null){
            logement = 'N/A';
        }
        var dLogement = $("<div>", {
            class: "dLogement",
            text: logement
        });
        depenseItem.append(dLogement);
        var date = item.Date1;
        if (date != null){
            date = date.substring(0, date.indexOf("T"));
        }
        var dDate = $("<div>", {
            class: "dDate",
            text: date
        });
        depenseItem.append(dDate);
        var dValide = $("<div>", {
            class: "dValide",
            text: item.Valide
        });
        depenseItem.append(dValide);
    })
}
$(document).ready(function(){
    var promise1 = getAllDepensesDocLib();
    $.when(promise1).done(function(results) {
        var AllDepenses = getAllDepensesDocLib();
        var depenseCurrentYear = GetDepenseCurrentYear(AllDepenses);
        displayDepense(depenseCurrentYear);
    });
});