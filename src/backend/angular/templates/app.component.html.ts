export const APP_COMPONENT_HTML_TEMPLATE = `<mat-sidenav-container>
<mat-sidenav mode="side" opened>
  <mat-nav-list>
    <mat-list-item>
    {{ #dataNodes }}
      <a matLine [routerLink]="['/{{ kebab }}']">{{ name }}</a>
    </mat-list-item>
    {{ /dataNodes }}
  </mat-nav-list>
</mat-sidenav>
<mat-sidenav-content>&nbsp;
  <router-outlet></router-outlet>
</mat-sidenav-content>
</mat-sidenav-container>
`