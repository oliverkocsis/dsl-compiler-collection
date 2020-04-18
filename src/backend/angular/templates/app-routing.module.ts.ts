export const APP_ROUTING_TEMPLATE = `import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
{{ #dataNodes }}
import { {{ pascal }}Component } from './{{ kebab }}/{{ kebab }}.component';
{{ /dataNodes }}


const routes: Routes = [
  {{ #dataNodes }}
  { path: '{{ kebab }}', component: {{ pascal }}Component },
  {{ /dataNodes }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
`