import template from './demoTemplate.html';

export default class DemoDirective {
    constructor() {
        this.template = template;
        this.restrict = 'E';
    }

    link($scope, element, attrs) {
        this.$scope = $scope;
        this.$scope.content="扫描应用后台管理系统";
    }
}

DemoDirective.$inject = [];