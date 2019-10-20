import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef, Output, EventEmitter, } from '@angular/core';
import * as Highcharts from 'highcharts' //highcharts图表
@Component({
  selector: 'app-highcharts',
  templateUrl: './highcharts.component.html',
  styleUrls: ['./highcharts.component.less']
})
export class HighchartsComponent implements OnChanges, OnInit {
  @Input() chartsObj: any; //接收父组件传递的图表配置参数
  public _Charts: any = ''; //接收chart
  public _ChartsModel: any = ''; //model chart
  public devicesId: any; //router值
  public selectedDevicesId: any = ''; //router不包函deviceid
  public deviceTypeId: any;
  public seriesList: any;
  public isVisible = false;

  @ViewChild('chartElement',{static:true}) public chartElement: ElementRef; //接收dom
  constructor() { }

  ngOnInit() { }
  //判断组件绑定值变化
  ngOnChanges(changes: SimpleChanges) {
    this.createChart();
  }
  //绘制hcharts
  createChart() {
    //图表参数
    let chartOption = {
      chart: {
        zoomType: this.chartsObj.zoomType || null,
        type: this.chartsObj.type || 'line', 
        renderTo: this.chartElement.nativeElement, //挂载元素
        height: 200,
      },
      title: {
        text: ""
      },
      xAxis: this.chartsObj.xAxis,
      yAxis: {
        title: {
          text: null
        }
      },
      plotOptions: this.chartsObj.plotOptions || {},
      series: this.chartsObj.seriesList,
      
    }
    if ((this._Charts != '' && this._Charts.index > -1) && !this.isVisible) {
      this._Charts.destroy();
    }
    if (this.chartsObj.seriesList && this.chartsObj.seriesList.length) {
      this._Charts = new Highcharts.Chart(chartOption);
    } else {
      this._Charts = '';
    }
  }
}
