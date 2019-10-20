import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layout/default/default.component';
import { DataForecastComponent } from './pages/data-forecast/data-forecast.component';
import { VideoPlayComponent } from './pages/video-play/video-play.component';
import { KeyGuaranteeComponent } from './pages/key-guarantee/key-guarantee.component';
import { CoastalComponent } from './pages/coastal/coastal.component';
// const routes: Routes = [
//   { path: '', pathMatch: 'full', redirectTo: '/welcome' },
//   { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) }
// ];
const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      { path: '', redirectTo: 'dataForecast', pathMatch: 'full' },
      {
        path: 'dataForecast', component: DataForecastComponent,
        data: {
          breadcrumb: '数据预报'
        }
      },
      {
        path: 'coastal', component: CoastalComponent,
        data: {
          breadcrumb: '沿海预报'
        }
      },
      {
        path: 'keyGuarantee', component: KeyGuaranteeComponent,
        data: {
          breadcrumb: '重点保障预报'
        }
      },
      {
        path: 'videoPlay', component: VideoPlayComponent,
        data: {
          breadcrumb: '视频节目'
        }
      }
    ],
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
