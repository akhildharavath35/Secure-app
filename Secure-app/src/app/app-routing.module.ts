import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestoutpassComponent } from './requestoutpass/requestoutpass.component';
import { ViewoutpassComponent } from './viewoutpass/viewoutpass.component';
import { ProfileComponent } from './profile/profile.component';
import { RequestformComponent } from './requestform/requestform.component';
import { ViewdataComponent } from './viewdata/viewdata.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { StudentsoutpassComponent } from './studentsoutpass/studentsoutpass.component';
import { SentComponent } from './sent/sent.component';
import { MinihomeComponent } from './minihome/minihome.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path : 'home' , component:HomeComponent,canActivate: [AuthGuard],
    children:[
    {path :'requestoutpass' , component: RequestoutpassComponent,
        children: [
          { path: '', redirectTo: 'requestform', pathMatch: 'full' },
          { path: 'requestform', component: RequestformComponent  },
          { path: 'viewdata', component: ViewdataComponent  },
          { path: 'sent', component: SentComponent  }
                  ]},
    {path :'viewoutpass' , component: ViewoutpassComponent,
        children: [
          { path: '', redirectTo: 'viewdata', pathMatch: 'full' },
          { path: 'viewdata', component: ViewdataComponent  }
                  ]
    },

    {path :'minihome' , component: MinihomeComponent},

    {path :'profile' , component: ProfileComponent},    
              
          ],
    
  },



  {path : 'adminhome' , component:AdminhomeComponent,canActivate: [AuthGuard],
  children:[

    {path :'studentsoutpass' , component: StudentsoutpassComponent},  

    {path :'minihome' , component: MinihomeComponent},
                
            ],
    
  },
  
  {path :'login' , component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    onSameUrlNavigation:"reload",useHash:true,
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
