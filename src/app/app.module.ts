import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule, NZ_I18N, zh_CN, NZ_ICONS } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { ArcgisMapComponent } from './blocks/arcgis-map/arcgis-map.component';
import { DefaultComponent } from './layout/default/default.component';
import { DataForecastComponent } from './pages/data-forecast/data-forecast.component';
import { VideoPlayComponent } from './pages/video-play/video-play.component';
import { KeyGuaranteeComponent } from './pages/key-guarantee/key-guarantee.component';
import { CoastalComponent } from './pages/coastal/coastal.component';
import { HighchartsComponent } from './blocks/highcharts/highcharts.component';
import { PointerFloorPipe } from './pointer-floor.pipe';
import { EchartsComponent } from './blocks/echarts/echarts.component';
import { NgxEchartsModule } from 'ngx-echarts';
registerLocaleData(zh);
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])
@NgModule({
  declarations: [
    AppComponent,
    ArcgisMapComponent,
    DefaultComponent,
    DataForecastComponent,
    VideoPlayComponent,
    KeyGuaranteeComponent,
    CoastalComponent,
    HighchartsComponent,
    PointerFloorPipe,
    EchartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxEchartsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }, { provide: NZ_ICONS, useValue: icons }],
  bootstrap: [AppComponent]
})
export class AppModule { }
