'use strict';
/* Node to all from OHAD 17.4.16
    If you want to add new search type, you will need to add new "row-type" that show your data.
    So you need to write this "row-type" שccording to your needs and how your data was written.
    More INFO: in the "var templates" below you need to add :
    "'search-[name of type]': '/icu/components/row-types/search-[name of type]-row.html'"
    And of course add the file there.
    Also, need to add route in: "/icu/packages/custom/icu/public/app/app.js".
    Add folder of the details of the type (in the right side). Like "/icu/packages/custom/icu/public/components/task-details"
*/
angular.module('mean.icu.ui.rows', [])
.directive('icuListRow', function($compile, $http, $templateRequest) {
    var templates = {
        people: '/icu/components/row-types/people-row.html',
        task: '/icu/components/row-types/task-row.html',
        project: '/icu/components/row-types/project-row.html',
        discussion: '/icu/components/row-types/discussion-row.html',
        'search-task': '/icu/components/row-types/search-task-row.html',
        'search-project': '/icu/components/row-types/search-project-row.html',
        'search-discussion': '/icu/components/row-types/search-discussion-row.html',
        'search-attachment': '/icu/components/row-types/search-attachment-row.html',
        'search-update': '/icu/components/row-types/search-update-row.html'

    };

    function compileTemplate($scope, $element, template) {
        $element.html(template);

        var scope = $scope.$new(true);
        scope.data = $scope.data;
        $compile($element.contents())(scope);
    }

    function link($scope, $element) {
        var templateUrl = templates[$scope.type];
        $templateRequest(templateUrl).then(function(result) {
            compileTemplate($scope, $element, result);
        });
    }

    return {
        restrict: 'A',
        scope: {
            type: '@',
            data: '='
        },
        link: link,
        transclude: true,
        template: ''
    };
});
