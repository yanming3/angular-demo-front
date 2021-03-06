export default function createDirectiveFactory(Directive) {
    const factory = function (...args) {
        let instance = new Directive(...args);
        for (var key in instance) {
            instance[key] = instance[key];
        }

        if (instance.link) {
            let linkOrg = instance.link;
            instance.link = function (...linkArgs) {
                var instance = new Directive(...args);
                linkOrg.apply(instance, linkArgs);
            };
        }

        if (instance.controller) {
            let controllerOrg = instance.controller;
            instance.controller = function (...controllerArgs) {
                let instance = new Directive(...args);
                controllerOrg.apply(instance, controllerArgs);
            };

            instance.controller.$inject = controllerOrg.$inject || ['$scope', '$element'];
        }

        return instance;
    };

    factory.$inject = Directive.$inject || [];

    return factory;
}