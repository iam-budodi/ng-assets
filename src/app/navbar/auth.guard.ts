import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from "@angular/core";
import {Location} from "@angular/common";
import {KeycloakAuthGuard, KeycloakService} from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends KeycloakAuthGuard {
  constructor(
    protected override readonly router: Router,
    protected readonly keycloak: KeycloakService,
    private location: Location
  ) {
    super(router, keycloak);
  }

  async isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Force the user to log in if currently unauthenticated.
    if (!this.authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url
      });
    }

    // Get the roles required from the route.
    const requiredRoles = route.data['roles'];

    //TODO : UNCOMMENT TO RETURN TO DASHBOARD :::: CHECK IF WORKS :::: GOOD LUCK
    if (!requiredRoles.every((role: any) => this.roles.includes(role))) {
      // await this.router.navigate(['/']); // navigates back to the dashboard
      console.log('CURRENT : ' + JSON.stringify(this.location.path()))
      await this.router.navigate(['/'], {replaceUrl: true, queryParamsHandling: 'preserve'});
      // console.log('URL : ' + JSON.stringify(window.history.state))
      // await this.router.navigate([this.router.url]); // navigates back to the dashboard
    }

    // Allow the user to proceed if no additional roles are required to access the route.
    if (!Array.isArray(requiredRoles) || requiredRoles.length === 0) {
      return true;
    }

    // Allow the user to proceed if all the required roles are present.
    return requiredRoles.every((role) => this.roles.includes(role));
  }
}
