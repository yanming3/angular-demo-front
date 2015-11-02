class HomeController {
  constructor(authService) {
    this.authService = authService;

    this.isAuth = this.authService.isAuth();

    if (this.isAuth) {
      this.user = this.authService.getUser();
    }
  }

  logout(event) {
    event.preventDefault();
    this.authService.logout();
    this.isAuth = false;
    this.user = null;
  }
}

HomeController.$inject = [ 'authService'];

export default HomeController;