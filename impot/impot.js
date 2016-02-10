//todo le round est pas précis.... utiliser une autre méthode... et enlever mes patch

var depensesDocLib;
//todo ne utiliser variable globale
var DepenseCurrentYear;
//todo trouver une manière de faire plus clean
var year = "2015.00000000000";
var impotFoncier = 0;
var fraisJuridique = 0;
var officeFees = 0;
var entretienEtReparation = 0;
var entretienEtReparation1821 = 0;
var entretienEtReparation1823 = 0;
var entretienEtReparation1825 = 0;
var entretienEtReparationGlobal = 0;
var assurance = 0;
var interetHypotheque = 0;
var interetHypothequePerso = 0;
var revenueAnneeCouranteArray;
var revenueArray;
var revenueAnneeCourante1821Array;
var revenueAnneeCourante1825Array;
var revenueAnneeCourante1823Array;
var revenueAnneeCourante1821Total = 0;
var revenueAnneeCourante1825Total = 0;
var revenueAnneeCourante1823Total = 0;
var revenueAnneeCouranteTotal = 0;
var revenueAnneeCouranteSans1821Total = 0;
var publicity = 0;
var managementAdmin = 0;
var salary = 0;
var travelling = 0;
var publicServices = 0;
var impotFoncierPersoTotal = 0;
var fraisJuridiquePersoTotal = 0;
var officeFeesPersoTotal = 0;
var assurancePersoTotal = 0;
var publicityPersoTotal = 0;
var managementAdminPersoTotal = 0;
var salaryPersoTotal = 0;
var travellinPersoTotal = 0;
var publicServicesPerspTotal = 0;
var entretienEtReparationPersoTotal = 0;
var interetMargeDeCredit;
var interetMargeDeCreditPerso;
var totalDepense;
var totalDepensePerso;
var fraisJuridique1821;
var fraisJuridique1825;
var fraisJuridique1823;
var fraisJuridiqueGlobal;
var fraisJuridiquePerso;
var nbDepense;
/* taxo référence
 Collonne Cat Impot : abb42f33a9624f5ca80efef7362d4ef5

 Office fees|9e6bdc75-c96b-40e7-a89b-34a2b8f200f7
 Frais de bureau|9e6bdc75-c96b-40e7-a89b-34a2b8f200f7
 Maintenance and Repair|4f3aeab1-3e03-47f4-9990-dd37ae87f392
 Frais juridique|a2192a6a-8439-4465-8593-95930a0580c7
 Impôt foncier|4e91a24b-6cc1-4801-9a17-91a1ec3811ad
 Insurrances|6ba259e2-93bd-46ca-8579-e7fc7acbb0f4
 Publicity|50ed2166-821c-47cd-ab63-8690a5fb8464
 Management and administration|41a359ab-819a-4d9b-a22c-5877221464a7
 Salary|b582165d-1c99-49c2-8cf3-ff9c54ecdaf7
 Travelling fees|12d9f782-8056-49d4-8696-afd77161c2da
 Publics Services|fb9722e0-962d-4b53-acc0-8aba1ea0765f

 Nouveau !!!
 Frais Bancaire|d9207e22-6410-496a-b448-411d569e48db
 Outils|d3869aad-335f-4371-8be6-1614acb756b3


colonne Logement : mb224476f17843fca98a3d3839819897
 1821 Bennett (1e)|12fca2cb-ce06-4897-a85e-81c7a6f11a0b
 1823 Bennett (3e)|e7b37114-f23f-4147-ba74-838fb1465b93
 1825 Bennett (2e)|af6d2616-e905-470c-ab44-ef035e17daed
 Global|f2fe96e7-9b59-4dfc-99c7-712e483f1072
 */

function roundNumber(rnum, rlength) { // Arguments: number to round, number of decimal places
    var newnumber = Math.round(rnum*Math.pow(10,rlength))/Math.pow(10,rlength);
    return newnumber;
}
function getAllDepensesDocLib(){
    var def1 = $.Deferred();
    getListByTitleItems("Depenses", _spPageContextInfo.webAbsoluteUrl, "", "ID, Title, Prix, GestionnairesChoice, P, RCol, Year, abb42f33a9624f5ca80efef7362d4ef5, mb224476f17843fca98a3d3839819897", "",
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
function getAllRevenue(){
    var def1 = $.Deferred();
    //todo  remplacer le filter avec qqchose de dynamique
    getListByTitleItems("Revenue (Loyer et autres)", _spPageContextInfo.webAbsoluteUrl, "", "Title,Date,revPremier,revDeuxieme,revTroisieme, Year", "",
        //,_x0031_825_x0020__x0028_2e_x0029,_x0031_823_x0020__x0028_3e_x0029
        function (data) {
            revenueArray = data.d.results;
            console.log("Revenu Array");
            console.log(revenueArray);
            if (revenueArray.length === 0) {
                console.log("pas de revenu, sti");
                return;
            }
            def1.resolve();
        },errorHandler
    );
    return def1.promise();
}
function sumPrix (arraySource){
    var x = 0;
    $.each(arraySource, function(index,item) {
        x = x + item.Prix;
    });
    return x;
}
//// j'arrive pas à faire fonctionner ceci..... le .fieldname marche pas
function sumField (arraySource,field){
    var x = 0;
    var y = 0;
    var z = 0;
    $.each(arraySource, function(index,item) {
        y = item.field;
        x = x + item.field;
    });
    z = roundNumber(x,2);
    return z;
}

function GetDepenseCurrentYearClean(Depenses){
    var x = Depenses.filter(function(item){
        return (item.abb42f33a9624f5ca80efef7362d4ef5 !=  null && item.Year == year && item.RCol != 1);
    });
    console.log('GetDepenseCurrentYearClean');
    console.log(x);
    return x;
}
function GetDepenseCurrentYear(Depenses){
    var x = Depenses.filter(function(item){
        return (item.Year == year && item.RCol != 1);
    });
    console.log('GetDepenseCurrentYear');
    console.log(x);
    return x;
}
function GetDepenseCurrentYearLogementClean(Depenses){
    var x = Depenses.filter(function(item){
        return (item.abb42f33a9624f5ca80efef7362d4ef5 !=  null && item.mb224476f17843fca98a3d3839819897 != null && item.Year == year && item.RCol != 1);
    });
    console.log('GetDepenseCurrentYearLogementClean');
    console.log(x);
    return x;
}
function GetSumCatImpot(DepenseCurrentYearClean, GUIDCatImpot){
    var x = DepenseCurrentYearClean.filter(function(item){
        //item.abb4.... c'est la collone taxo Catégorie import
        return (item.abb42f33a9624f5ca80efef7362d4ef5.indexOf(GUIDCatImpot) != -1)
    });
    var z = x.length;
    var y = roundNumber(sumPrix(x),2);
    var w = roundNumber(y/3,2);
    console.log('GetSumCatImpot - ' + GUIDCatImpot);
    console.log({total:y,count:z,perso:w});
    return {total:y,count:z,perso:w};
}
function GetSumCatImpotLogement(DepenseCurrentYearClean, GUIDCatImpot, GUIDLogement){
    var x = DepenseCurrentYearClean.filter(function(item){
        //item.abb4.... c'est la collone taxo Catégorie import
        return (item.abb42f33a9624f5ca80efef7362d4ef5.indexOf(GUIDCatImpot) != -1 && item.mb224476f17843fca98a3d3839819897.indexOf(GUIDLogement) != -1)
    });
    var y = roundNumber(sumPrix(x),2);
    var z = x.length;
    console.log('GetSumCatImpot');
    console.log(y);
    return {total:y,count:z};
}
function calculateRevenuAnneeCourante(){
    revenueAnneeCourante1821Total = 0;
    revenueAnneeCourante1825Total = 0;
    revenueAnneeCourante1823Total = 0;
    revenueAnneeCouranteArray = revenueArray.filter(function(item){
        return (item.Year == year)
    });
    revenueAnneeCourante1821Array = revenueAnneeCouranteArray.filter(function(item){
        return (item.revPremier > 0)
    });
    revenueAnneeCourante1825Array = revenueAnneeCouranteArray.filter(function(item){
        return (item.revDeuxieme > 0)
    });
    revenueAnneeCourante1823Array = revenueAnneeCouranteArray.filter(function(item){
        return (item.revTroisieme > 0)
    });

    $.each(revenueAnneeCouranteArray, function(index,item) {
        revenueAnneeCourante1821Total = revenueAnneeCourante1821Total + item.revPremier;
        revenueAnneeCourante1825Total = revenueAnneeCourante1825Total + item.revDeuxieme;
        revenueAnneeCourante1823Total = revenueAnneeCourante1823Total + item.revTroisieme;
    });
    revenueAnneeCourante1821Total = roundNumber(revenueAnneeCourante1821Total,2);
    revenueAnneeCourante1825Total = roundNumber(revenueAnneeCourante1825Total,2);
    revenueAnneeCourante1823Total = roundNumber(revenueAnneeCourante1823Total,2);
    console.log('!!!!!!!!!!!!!!!!!!!!');
    console.log({r1821:revenueAnneeCourante1821Total,r1821Count:revenueAnneeCourante1821Array.length });
    return {r1821:revenueAnneeCourante1821Total,r1821Count:revenueAnneeCourante1821Array.length,r1825:revenueAnneeCourante1825Total,r1825Count:revenueAnneeCourante1825Array.length,r1823:revenueAnneeCourante1823Total,r1823Count:revenueAnneeCourante1823Array.length}
}
function calculateEntretientEtReparation(DepenseCurrentYearClean, DepenseCurrentYearLogementClean){

    nbDepense = DepenseCurrentYearClean.length;

    impotFoncier = GetSumCatImpot(DepenseCurrentYearClean, '4e91a24b-6cc1-4801-9a17-91a1ec3811ad');
    officeFees = GetSumCatImpot(DepenseCurrentYearClean, '9e6bdc75-c96b-40e7-a89b-34a2b8f200f7');
    assurance = GetSumCatImpot(DepenseCurrentYearClean, '6ba259e2-93bd-46ca-8579-e7fc7acbb0f4');
    publicity = GetSumCatImpot(DepenseCurrentYearClean, '50ed2166-821c-47cd-ab63-8690a5fb8464');
    managementAdmin = GetSumCatImpot(DepenseCurrentYearClean, '41a359ab-819a-4d9b-a22c-5877221464a7');
    salary = GetSumCatImpot(DepenseCurrentYearClean, 'b582165d-1c99-49c2-8cf3-ff9c54ecdaf7');
    travelling = GetSumCatImpot(DepenseCurrentYearClean, '12d9f782-8056-49d4-8696-afd77161c2da');
    publicServices = GetSumCatImpot(DepenseCurrentYearClean, 'fb9722e0-962d-4b53-acc0-8aba1ea0765f');

    // todo à inclure dans les calcul
    fraisBancaire = GetSumCatImpot(DepenseCurrentYearClean, 'd9207e22-6410-496a-b448-411d569e48db');
    outils = GetSumCatImpot(DepenseCurrentYearClean, 'd3869aad-335f-4371-8be6-1614acb756b3');

    fraisJuridique = GetSumCatImpot(DepenseCurrentYearClean, 'a2192a6a-8439-4465-8593-95930a0580c7');
    fraisJuridique1821 = GetSumCatImpotLogement(DepenseCurrentYearLogementClean, 'a2192a6a-8439-4465-8593-95930a0580c7', '12fca2cb-ce06-4897-a85e-81c7a6f11a0b');
    fraisJuridique1825 = GetSumCatImpotLogement(DepenseCurrentYearLogementClean, 'a2192a6a-8439-4465-8593-95930a0580c7', 'e7b37114-f23f-4147-ba74-838fb1465b93');
    fraisJuridique1823 = GetSumCatImpotLogement(DepenseCurrentYearLogementClean, 'a2192a6a-8439-4465-8593-95930a0580c7', 'af6d2616-e905-470c-ab44-ef035e17daed');
    fraisJuridiqueGlobal = GetSumCatImpotLogement(DepenseCurrentYearLogementClean, 'a2192a6a-8439-4465-8593-95930a0580c7', 'f2fe96e7-9b59-4dfc-99c7-712e483f1072');
    entretienEtReparation = GetSumCatImpot(DepenseCurrentYearClean, '4f3aeab1-3e03-47f4-9990-dd37ae87f392');
    entretienEtReparation1821 = GetSumCatImpotLogement(DepenseCurrentYearLogementClean, '4f3aeab1-3e03-47f4-9990-dd37ae87f392', '12fca2cb-ce06-4897-a85e-81c7a6f11a0b');
    entretienEtReparation1823 = GetSumCatImpotLogement(DepenseCurrentYearLogementClean, '4f3aeab1-3e03-47f4-9990-dd37ae87f392', 'e7b37114-f23f-4147-ba74-838fb1465b93');
    entretienEtReparation1825 = GetSumCatImpotLogement(DepenseCurrentYearLogementClean, '4f3aeab1-3e03-47f4-9990-dd37ae87f392', 'af6d2616-e905-470c-ab44-ef035e17daed');
    entretienEtReparationGlobal = GetSumCatImpotLogement(DepenseCurrentYearLogementClean, '4f3aeab1-3e03-47f4-9990-dd37ae87f392', 'f2fe96e7-9b59-4dfc-99c7-712e483f1072');
    interetMargeDeCredit = 955.99;
    interetHypotheque = 12050.2;
    
    totalDepense = interetHypotheque + impotFoncier.total + fraisJuridique.total + officeFees.total + assurance.total + publicity.total + managementAdmin.total + salary.total + travelling.total + publicServices.total  + interetMargeDeCredit +entretienEtReparation.total;
    totalDepense = roundNumber(totalDepense,2);

    entretienEtReparationPersoTotal = entretienEtReparation1821.total + entretienEtReparationGlobal.total/3;
    fraisJuridiquePerso = fraisJuridique1821.total + fraisJuridiqueGlobal.total/2;
    interetMargeDeCreditPerso = roundNumber(interetMargeDeCredit/3,2);
    interetHypothequePerso = roundNumber(interetHypotheque/3,2);

    totalDepensePerso = interetHypothequePerso + impotFoncierPersoTotal + fraisJuridiquePersoTotal + fraisJuridiquePersoTotal + officeFeesPersoTotal + assurancePersoTotal + publicityPersoTotal + managementAdminPersoTotal + salaryPersoTotal + travellinPersoTotal + publicServicesPerspTotal + entretienEtReparationPersoTotal + interetMargeDeCreditPerso;
    totalDepensePerso = roundNumber(totalDepensePerso,2);
    revenue = calculateRevenuAnneeCourante();
    revenueAnneeCouranteTotal = revenue.r1821 + revenue.r1825 + revenue.r1823;
    revenueAnneeCouranteSans1821Total =  revenue.r1825 + revenue.r1823;


    depenseDeductible = totalDepense - totalDepensePerso;
    depenseDeductible = roundNumber(depenseDeductible,2);
    revenueNette = roundNumber(revenueAnneeCouranteSans1821Total - depenseDeductible,2);
    revenueNetteParPersonne = roundNumber(revenueNette/2,2);
}

function displayImpot(DepenseCurrentYearClean, DepenseCurrentYearLogementClean) {
    revenue = calculateRevenuAnneeCourante();
    $("#publicity").append(publicity.total + " (" + publicity.count + ")");
    $("#publicityPerso").append(publicity.perso);
    $("#assurance").append(assurance.total + " (" + assurance.count + ")");
    $("#assurancePerso").append(assurance.perso);
    $("#interetHypotheque").append(interetHypotheque + " (Calculé manuellement)");
    $("#interetHypothequePerso").append(interetHypothequePerso);

    $("#interetMarge").append(interetMargeDeCredit + " (Calculé manuellement)");
    $("#interetMargePerso").append(interetMargeDeCreditPerso);

    $("#officeFees").append(officeFees.total + " (" + officeFees.count + ")");
    $("#officeFeesPerso").append(officeFees.perso);
    $("#fraisJuridique").append(fraisJuridique.total + " (" + fraisJuridique.count + ")");
    $("#fraisJuridiquePerso").append(fraisJuridiquePerso + " (" + Math.round(fraisJuridiquePerso/fraisJuridique.total*100*100).toFixed(2)/100 + "%)");
    if (fraisJuridique.count != (fraisJuridique1821.count + fraisJuridique1825.count + fraisJuridique1823.count + fraisJuridiqueGlobal.count)){
        $("#fraisJuridiquePerso").append("</br>");
        $("#fraisJuridiquePerso").append("ATTENTION : il y a " + (fraisJuridique.count - fraisJuridique1821.count - fraisJuridique1825.count - fraisJuridique1823.count - fraisJuridiqueGlobal.count) + " dépenses qui n'ont pas de logement associé !!!");
        $("#fraisJuridiquePerso").css("background-color","#FFB280");
    }
    $("#management").append(managementAdmin.total + " (" + managementAdmin.count + ")");
    $("#managementPerso").append(managementAdmin.perso);
    $("#entretienEtReparation").append(entretienEtReparation.total + " (" + entretienEtReparation.count + ")");
    $("#entretienEtReparationPerso").append(entretienEtReparationPersoTotal  + " (" + Math.round(entretienEtReparationPersoTotal/entretienEtReparation.total*100*100).toFixed(2)/100 + "%)");
    if (entretienEtReparation.count != (entretienEtReparation1821.count + entretienEtReparation1825.count + entretienEtReparation1823.count + entretienEtReparationGlobal.count)){
        $("#entretienEtReparationPerso").append("</br>");
        $("#entretienEtReparationPerso").append("ATTENTION : il y a " + (entretienEtReparation.count - entretienEtReparation1821.count - entretienEtReparation1825.count - entretienEtReparation1823.count -entretienEtReparationGlobal.count) + " dépenses qui n'ont pas de logement associé !!!");
        $("#entretienEtReparationPerso").css("background-color","#FFB280");
    }
    $("#impotFoncier").append(impotFoncier.total + " (" + impotFoncier.count + ")");
    $("#impotFoncierPerso").append(impotFoncier.perso);
    $("#travelling").append(travelling.total + " (" + travelling.count + ")");
    $("#travellingPerso").append(travelling.perso);
    $("#publicServices").append(publicServices.total + " (" + publicServices.count + ")");
    $("#publicServicesPerso").append(publicServices.perso);
    $("#salary").append(salary.total + " (" + salary.count + ")");
    $("#salaryPerso").append(salary.perso);

    $("#Revenue1821").append(revenue.r1821 + " (" + revenue.r1821Count + ")");
    $("#Revenue1825").append(revenue.r1825 + " (" + revenue.r1825Count + ")");
    $("#Revenue1823").append(revenue.r1823 + " (" + revenue.r1823Count + ")");
    $("#RevenueTotal").append(revenueAnneeCouranteTotal);
    $("#RevenueSans1821Total").append(revenueAnneeCouranteSans1821Total);

    $("#total").append(totalDepense);
    $("#totalPerso").append(totalDepensePerso);


    $("#depenseDeductible").append(depenseDeductible);
    $("#revenueNette").append(revenueNette);
    $("#revenueNetteParPersonne").append(revenueNetteParPersonne);

    var nbDepenseCurrentYearTotal = DepenseCurrentYear.length;
    divImpot = $("#depenseValidation");
    divImpot.append("Nombre de dépense dans l'année courante : " + nbDepenseCurrentYearTotal + "</br>");

    var nbDepenseAvecCatImpot =
        impotFoncier.count +
        officeFees.count +
        assurance.count +
        publicity.count +
        managementAdmin.count +
        salary.count +
        travelling.count +
        publicServices.count +
        fraisJuridique.count +
        entretienEtReparation.count +
        fraisBancaire.count +
        outils.count;

    divImpot.append("Nombre de dépense avec une catégorie d'impot : " + nbDepenseAvecCatImpot);


    divImpot = $("#impot");
    divEntretienEtReparation = $("<div>", {
        class: "impot",
        text: "Entretien et réparation Total : " + entretienEtReparation.total
    });
    divEntretienEtReparation1821 = $("<div>", {
        class: "impot",
        text: "Entretien et réparation 1821 : " + entretienEtReparation1821.total
    });
    divEntretienEtReparation1823 = $("<div>", {
        class: "impot",
        text: "Entretien et réparation 1823 : " + entretienEtReparation1823.total
    });
    divEntretienEtReparation1825 = $("<div>", {
        class: "impot",
        text: "Entretien et réparation 1825 : " + entretienEtReparation1825.total
    });
    divEntretienEtReparationGlobal = $("<div>", {
        class: "impot",
        text: "Entretien et réparation global : " + entretienEtReparationGlobal.total
    });
    divImpot.append(divEntretienEtReparation);
    divImpot.append(divEntretienEtReparation1821);
    divImpot.append(divEntretienEtReparation1823);
    divImpot.append(divEntretienEtReparation1825);
    divImpot.append(divEntretienEtReparationGlobal);
}
$(document).ready(function(){
    var promise1 = getAllDepensesDocLib();
    var promise2 = getAllRevenue();
    $.when(promise1, promise2).done(function(results) {
        //getAllDepensesList();
        //getAllDepensesDocLib();
        //getAllReleveCompteDocLib();
        //getAllRevenue();
        var DepenseCurrentYearClean;
        console.log('promise1');
        console.log(promise1);
        var AllDepenses = getAllDepensesDocLib();
        console.log('AllDepenses');
        console.log(AllDepenses);
        DepenseCurrentYearClean = GetDepenseCurrentYearClean(AllDepenses);
        DepenseCurrentYear = GetDepenseCurrentYear(AllDepenses);
        var DepenseCurrentYearLogementClean;
        DepenseCurrentYearLogementClean = GetDepenseCurrentYearLogementClean(AllDepenses);
        calculateEntretientEtReparation(DepenseCurrentYearClean, DepenseCurrentYearLogementClean);

        displayImpot(DepenseCurrentYearClean, DepenseCurrentYearLogementClean);
    });
});