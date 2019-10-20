import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, Pipe, ElementRef, } from '@angular/core';
import { ServersService } from '../../servers.service';
import { format, addHours } from 'date-fns';
import { loadModules } from 'esri-loader';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { Subject } from 'rxjs';

export interface VirtualDataInterface {
  index:number,
  time: string;
  speed: string;
  label: string;
}
@Pipe({ name: 'pointerFloor' })
@Component({
  selector: 'app-data-forecast',
  templateUrl: './data-forecast.component.html',
  styleUrls: ['./data-forecast.component.less']
})

export class DataForecastComponent implements OnInit,AfterViewInit, OnDestroy {
  //设置曲线table虚拟滚动
  @ViewChild('virtualTable', { static: false }) 
  //子组件
  @ViewChild('mapElement', { static: true }) public mapElement: ElementRef; //接收map dom

  nzTableComponent: NzTableComponent;
  private destroy$ = new Subject();
  listOfData: VirtualDataInterface[] = [];

  trackByIndex(_: number, data: VirtualDataInterface): number {
    return data.index;
  }
  public api_productpublishtime = "/jx/productpublishtime/";//大面
  public api_chart = "/jx/ncData/";//曲线
  public api_MapServer = "http://xxs.dhybzx.org:6086/arcgis/rest/services/";//地图服务
  public isSpinning = true;
  public barList = []; //时间轴
  public preIndex = 0; //上一个时刻
  public intervalPlay = null; //播放定时器
  public activePlay = false;  //播放按钮状态
  public playKey = 0; //当前播放时刻
  public chartData:any ={};
  public publishtime;
  public isLoading =false;
  //弹框样式对象
  public showPop = false;//是否显示曲线框
  public popoverStyle = {
  };
  public activePoint = {};

  public selectedType:any = this.server.elements[0];

  constructor(public server: ServersService) {}
  ngOnInit() {
  }
  ngAfterViewInit(): void {
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  //获取地图服务发布时间
  getPublishtime(){
    if (this.showPop){
      this.showPop = false;
    }
    this.isSpinning = true;
    let options = {
      api: this.api_productpublishtime + this.selectedType.type,
    }
    this.server.getRxjsData(options).subscribe((data) => {
      this.publishtime = data[0].PUBLISHTIME;
      this.barList = [];
      // this.server.sublayerList = [];
      for (var i = 0; i < 72; i++) {
        this.barList.push({
          active: i === 0 ? true : false,
          name: format(addHours(data[0].PUBLISHTIME, i), 'DD日HH时')
        });
      }
    })
    //刷新图层
    loadModules([
      "esri/layers/MapImageLayer",
    ]).then(([MapImageLayer]) => {
      //验证是否已经存在图层
      if (this.server.layer){
        this.server.map.remove(this.server.layer);
      }
      this.server.layer = new MapImageLayer({
        url: "http://xxs.dhybzx.org:6086/arcgis/rest/services/"+this.selectedType.type+"/MapServer",
        imageMaxHeight: 977,
        imageMaxWidth: 1920,
        dpi: 96,
      });
      // this.server.map.add(tdtLayer, annoTDTLayer)
      this.server.map.add(this.server.layer);
      //promise view loader
      this.server.view.whenLayerView(this.server.layer)
        .then(() => {
          //设置0时刻显示
          this.server.layer.allSublayers.items[0].visible = true;
          this.server.layer.allSublayers.items[0].sublayers.forEach(element => {
            element.visible = true;
          });
          this.isSpinning = false;
          //绑定点击事件
          this.server.view.on("click", ($event) => {
            // this.server.view.hitTest($event).then(function (response) {
            //   if (response.results[0]) {
            //     this.activePoint = response.results[0].mapPoint;
            //     this.getChartData($event)
            //   }
            // })
            this.activePoint = $event.mapPoint;
            const screenPoint = this.server.view.toScreen($event.mapPoint);
            this.dealStyle(screenPoint)
            this.getChartData($event)
          })
          this.server.view.on("pointer-move", ($event) => {
            if (this.showPop) {
              const screenPoint = this.server.view.toScreen(this.activePoint);
              this.dealStyle(screenPoint)
            }
          });
        }).catch(function (error) {

        });
    })
  }
  //改变图层类型
  changeLayer(item){
    if(this.showPop){
      this.showPop = false;
    }
    this.server.elements.forEach(element=>{
      element.active = false;
    })
    this.selectedType = item;
    item.active = !item.active;
    this.getPublishtime();
  }
  //点击时刻
  targetBar(key, single?){
    if (single && this.intervalPlay){
      this.stopLayer();
    }
    this.barList.forEach((element,index) => {
      if (element.active){
        this.preIndex = index;
        element.active = false;
      }
    })
    this.barList[key].actived = true;
    this.barList[key].active = true;
    this.reflashLayer(this.preIndex,key)
  }
  //播放图层
  //key:需要刷新的图层对应的文件夹
  reflashLayer(preIndex, nextIndex){
    this.isSpinning = true;
    let preLayerName = this.selectedType.type + "_NAN_0" + preIndex;
    let layerName = this.selectedType.type + "_NAN_0" + nextIndex;
    this.server.layer.allSublayers.forEach(element => {
      if (element.title ==layerName){
        element.visible = true;
      } else if (element.title == preLayerName){
        element.visible = false;
      }
    });
    this.isSpinning = false;
  }
  //播放
  playLayer(){
    this.activePlay = !this.activePlay;
    if (this.activePlay){
      this.targetBar(this.playKey);
      this.startPlay();
    }else{
      this.stopLayer();
    }
  }
  //开始播放
  startPlay(){
    this.intervalPlay = setInterval(() => {
      this.targetBar(this.playKey);
      if (this.playKey >= 72) {
        this.stopLayer();
      }
      this.playKey++
    }, 3000)
  }
  //停止播放
  stopLayer(){
    this.activePlay = false;
    clearInterval(this.intervalPlay);
  }
  //获取曲线数据
  getChartData($event){
    this.isLoading = true;
    let options = {
      api: this.api_chart + $event.mapPoint.longitude + "/" + $event.mapPoint.latitude + "/" + this.selectedType.chartName
    }
    this.server.getRxjsData(options).subscribe((data) => {
      this.listOfData = data;
      let seriesLists = [];
      let categorieList = [];
      this.listOfData.forEach((element)=>{
        seriesLists.push(parseInt(element.speed));
        categorieList.push(element.time);
      })
      let obj = {
        height:"100px",
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: categorieList,
          axisLabel: {
            interval: 12,
            formatter: function (value, index) {
              return value.substring(8, value.length)
            }
          }
        },
        yAxis: {
          name: this.selectedType.name + "(" + this.selectedType.unit+")",
          type: 'value',
        },
        visualMap: {
          top: 0,
          right: 0,
          pieces: this.selectedType.pieces,
          outOfRange: {
            color: '#E20909'
          },
          show:false
        },
        series: [{
          data: seriesLists,
          type: 'line',
          areaStyle: {},
          smooth: true,
          symbol: 'none'
        }]
      }
      this.chartData = obj;
      this.isLoading = false;
    })

  }
  //处理坐标
  dealStyle(screenPoint) {
    this.popoverStyle = {
      left: (screenPoint.x+30) + 'px',
      top: (screenPoint.y - 250) + 'px',
    }
    this.showPop = true;
  }
}
