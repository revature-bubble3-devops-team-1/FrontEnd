import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from 'app/views/profile/profile/profile.component';
import { RegisterComponent } from 'app/views/register/register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingRoutingModule } from './app-routing-routing.module';
import { PostFeedComponent } from 'app/views/post-feed/post-feed.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent},
  { path: 'regiser', component: RegisterComponent},
  {path:'home', component: PostFeedComponent}
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppRoutingRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
