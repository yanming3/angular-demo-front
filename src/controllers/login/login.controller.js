class LoginController {
  constructor($location, authService) {
    this.$location = $location;
    this.authService = authService;
  }

  login() {
    this.authService.login(this.user.name, this.user.password).then(() => {
        debugger;
      this.$location.path('query');
    });
  }
}

LoginController.$inject = ['$location', 'authService'];

export default LoginController;