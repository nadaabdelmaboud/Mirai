import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { BlogComponent } from './components/blog/blog.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { SeeCommentsComponent } from './components/see-comments/see-comments.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'blog/:blogName',
    component: BlogComponent,
  },
  {
    path: 'profile/createPost',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile/editPosts',
    component: EditPostComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile/editProfile',
    component: EditProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile/comments',
    component: SeeCommentsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
