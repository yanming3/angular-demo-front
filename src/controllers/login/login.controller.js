class LoginController {
    constructor($location, authService) {
        this.$location = $location;
        this.authService = authService;
    }

    login() {
        this.authService.login(this.user.name, this.user.password).then(() => {
            this.$location.path('query');
        }, ()=> {
            this.$location.path('login');
        });
    }
}

LoginController.$inject = ['$location', 'authService'];

export default LoginController;