import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AuthService } from './services/auth.service';
import { ValidationService } from './services/validation.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { BlogComponent } from './components/blog/blog.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { SeeCommentsComponent } from './components/see-comments/see-comments.component';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    BlogComponent,
    ProfileComponent,
    EditPostComponent,
    EditProfileComponent,
    SeeCommentsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [AuthService, ValidationService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
