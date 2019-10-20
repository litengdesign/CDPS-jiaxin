import { Component, OnInit } from '@angular/core';
import { ServersService } from '../../servers.service';
import { loadModules } from 'esri-loader';
@Component({
  selector: 'app-coastal',
  templateUrl: './coastal.component.html',
  styleUrls: ['./coastal.component.less']
})
export class CoastalComponent implements OnInit {
  public api_productpublishtime = "/jx/seaforecastpic/";//大面
  public api_chart = "/jx/seaforecast/";//曲线
  public api_MapServer = "http://xxs.dhybzx.org:6086/arcgis/rest/services/";//地图服务
  public isSpinning = true;
  public barList = []; //时间轴
  public preIndex = 0; //上一个时刻
  public intervalPlay = null; //播放定时器
  public activePlay = false;  //播放按钮状态
  public playKey = 0; //当前播放时刻
  public chartData: any = {};
  public publishtime;
  public isLoading = false;
  //弹框样式对象
  public showPop = false;//是否显示曲线框
  public popoverStyle = {
  };
  public activePoint = {};

  public selectedType: any = this.server.elements[0];
  constructor(public server: ServersService) { }

  ngOnInit() {
  }
  getPublishtime(){
    //刷新图层
    loadModules([
      "esri/layers/MapImageLayer",
    ]).then(([MapImageLayer]) => {
      //验证是否已经存在图层
      if (this.server.layer) {
        this.server.map.remove(this.server.layer);
      }
      this.server.layer = new MapImageLayer({
        url: "http://xxs.dhybzx.org:6086/arcgis/rest/services/" + this.selectedType.type + "/MapServer",
        imageMaxHeight: 977,
        imageMaxWidth: 1920,
        dpi: 96,
      });
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
  //处理坐标
  dealStyle(screenPoint) {
    this.popoverStyle = {
      left: (screenPoint.x + 30) + 'px',
      top: (screenPoint.y - 185) + 'px',
    }
    this.showPop = true;
  }
  //获取曲线数据
  getChartData($event) {
    this.isLoading = true;
    let options = {
      api: this.api_chart + "id=1&element=" + this.selectedType.chartName
    }
    this.server.getRxjsData(options).subscribe((data) => {
      let seriesListsDir = [];
      let seriesListsPower = [];
      let categorieList = [];
      data.forEach((element) => {
        seriesListsDir.push(parseInt(element.DIR));
        seriesListsPower.push(parseInt(element.POWER));
        categorieList.push(element.DATATIME);
      })
      let obj = {
        height: "100px",
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
        yAxis: [
          {
            name: this.selectedType.seriesLeftName,
            type: 'value',
            max: 360
          },
          {
            name: this.selectedType.seriesRightName,
            type: 'value',
          }
        ],
        visualMap: {
          top: 0,
          right: 0,
          pieces: this.selectedType.pieces,
          outOfRange: {
            color: '#E20909'
          },
          show: false
        },
        series: [{
          name: '风向',
          yAxisIndex: 0,
          data: seriesListsDir,
          type: 'line',
          smooth: true,
          symbol: 'none'
        },{
          
            name: '风速',
            yAxisIndex: 1,
            data: seriesListsPower,
            type: 'line',
            areaStyle: {},
            smooth: true,
            symbol: 'none'
          }
        ]
      }
      this.chartData = obj;
      this.isLoading = false;
    })

  }
}
