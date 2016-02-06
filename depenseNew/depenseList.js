/**
 * Created by merli on 2016-02-05.
 */
/// <reference path="../tsReferences/_references.ts" />
var app = angular.module('myApp', ['umanage', 'ui.grid']);
app.controller('myCtrl', ['$scope', '$q', 'spJs', 'uiGridConstants', 'spList', function ($scope, $q, spJS, uiGridConstants, spList) {
        $scope.taxo_Merli_Perso_Fournisseur = window.localStorage.getItem('taxo_Merlin Perso_Fournisseur');
        function loadDocs() {
            var depenseDocs = spList.getListItemsFromWeb(_spPageContextInfo.webAbsoluteUrl, "Depenses", "&$top=5000", "ID, FileLeafRef, FileRef, Valide, Date1, Title, Prix, GestionnairesChoice, P, RCol, Year, abb42f33a9624f5ca80efef7362d4ef5, mb224476f17843fca98a3d3839819897", "", "");
            depenseDocs.then(function (result) {
                console.log("Depense Docs");
                console.log(result.length);
                _.map(result, function (item) {
                    var catImpot = item.abb42f33a9624f5ca80efef7362d4ef5;
                    if (catImpot != null) {
                        item.abb42f33a9624f5ca80efef7362d4ef5 = catImpot.substring(0, catImpot.indexOf("|"));
                    }
                    var logement = item.mb224476f17843fca98a3d3839819897;
                    if (logement != null) {
                        item.mb224476f17843fca98a3d3839819897 = logement.substring(0, logement.indexOf("|"));
                    }
                    var year = item.Year;
                    if (year != null) {
                        item.Year = year.substring(0, year.indexOf("."));
                    }
                });
                $scope.gripDepense.data = result;
            });
        }
        loadDocs();
        var rowtpl = '<div ng-class="{\'validated\':row.entity.Valide===true}" <div ng-repeat="col in colContainer.renderedColumns track by col.colDef.name"  class="ui-grid-cell" ui-grid-cell></div></div>';
        $scope.gripDepense = {
            enableFiltering: true,
            showGridFooter: true,
            showColumnFooter: true,
            rowTemplate: rowtpl,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            columnDefs: [
                { field: 'ID', displayName: "ID", filterCellFiltered: false, width: '5%' },
                { field: 'Prix', displayName: "Prix", filterCellFiltered: true, width: '6%', aggregationType: uiGridConstants.aggregationTypes.sum },
                { field: 'FileLeafRef', displayName: "Nom du fichier", filterCellFiltered: true },
                { field: 'Title', displayName: "Titre", filterCellFiltered: true },
                { field: 'GestionnairesChoice', displayName: "Gestionnaire", filterCellFiltered: true },
                { field: 'Year', displayName: "Année", filterCellFiltered: true, width: '5%' },
                { field: 'abb42f33a9624f5ca80efef7362d4ef5', displayName: "Cat Impot", filterCellFiltered: true },
                { field: 'mb224476f17843fca98a3d3839819897', displayName: "Logement", filterCellFiltered: true,
                    cellClass: function (grid, row, col, rowRenderIndex, colRenderIndex) {
                        if (grid.getCellValue(row, col) == 1) {
                            return 'blue';
                        }
                        return 'green';
                    } }
            ]
        };
    }]);
//# sourceMappingURL=depenseList.js.map