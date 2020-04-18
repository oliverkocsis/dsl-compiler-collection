import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { ShippingInformationComponent } from './shipping-information/shipping-information.component';


const routes: Routes = [
  { path: 'article', component: ArticleComponent },
  { path: 'shipping-information', component: ShippingInformationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
