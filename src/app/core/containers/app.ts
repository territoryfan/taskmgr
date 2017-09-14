import {Component} from '@angular/core';
import {OverlayContainer} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as actions from '../../actions/auth.action';
import * as prjActions from '../../actions/project.action';
import {Auth, Project} from '../../domain';

@Component({
  selector: 'app-root',
  template: `
  <md-sidenav-container [class.myapp-dark-theme]="dark" fullscreen>
    <md-sidenav #sidenav mode="over">
      <app-sidebar
        [auth]="(auth$ | async)?.token"
        [projects]="projects$ | async"
        (navClicked)="sidenav.close()"
        (prjClicked)="onPrjClicked($event)"></app-sidebar>
    </md-sidenav>
    <div class="site" fxLayout="column">
      <header>
        <app-header
          (toggle)="sidenav.toggle()"
          (toggleDarkTheme)="switchDarkTheme($event)"
          (logout)="onLogout()"
          [auth]="(auth$ | async)?.token">
        </app-header>
      </header>
      <main fxFlex="1" fxLayout="column" fxLayoutAlign="center center">
        <router-outlet></router-outlet>
      </main>
      <footer>
        <app-footer></app-footer>
      </footer>
    </div>
  </md-sidenav-container>
  `,
  styles: [`
    md-sidenav-container.myapp-dark-theme {
      background: black;
    }

    md-sidenav {
      width: 300px;
    }
  `]
})
export class AppComponent {

  private _dark = false;
  auth$: Observable<Auth>;
  projects$: Observable<Project[]>;

  constructor(
    private oc: OverlayContainer,
    private store$: Store<fromRoot.State>) {
      this.auth$ = this.store$.select(fromRoot.getAuth);
      this.projects$ = this.store$.select(fromRoot.getProjects);
  }

  get dark() {
    return this._dark;
  }

  switchDarkTheme(dark: boolean) {
    this._dark = dark;
    this.oc.themeClass = dark ? 'myapp-dark-theme' : '';
  }

  onLogout() {
    this.store$.dispatch(new actions.LogoutAction())
  }

  onPrjClicked(prj: Project) {
    this.store$.dispatch(new prjActions.SelectProjectAction(prj));
  }
}