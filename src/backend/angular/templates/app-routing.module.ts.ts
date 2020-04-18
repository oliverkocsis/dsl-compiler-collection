export const ROUTING_TEMPLATE = `import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { {{ pascal }}Component } from './{{ kebab }}/{{ kebab }}.component';


const routes: Routes = [
  { path: '{{ kebab }}', component: {{ pascal }}Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
`