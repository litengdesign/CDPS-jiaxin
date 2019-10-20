import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class ServersService {

  public configUrl = environment.API; //获取环境文件中api地址
  public postHeaders = new HttpHeaders(
    { 'Content-Type': 'application/json'}
  )
  //api
  public isDataForecast = false;
  constructor(private http: HttpClient, private msg: NzMessageService) {
  }
  public map;
  public view;
  public layer;
  public sublayerList = [];
  public elements = [
    {
      name: "海面风",
      type: "WIND",
      mapServer: "WIND/MapServer",
      chartName: "wind",
      icon: "iconGroup",
      unit: "m/s",
      seriesLeftName:'风向(°)',
      seriesRightName: '风速(m/s)',
      pieces: [
        {
          gt: 0,
          lte: 4,
          color: '#e6f0ff',
        },
        {
          gt: 4,
          lte: 5,
          color: '#d2e8ff',
        },
        {
          gt: 5,
          lte: 6,
          color: '#fae9d4',
        },
        {
          gt: 6,
          lte: 7,
          color: '#f0cab1',
        },
        {
          gt: 7,
          lte: 8,
          color: '#e6ad91',
        },
        {
          gt: 8,
          lte: 9,
          color: '#cc7958',
        },
        {
          gt: 9,
          lte: 10,
          color: '#c86437',
        },
        {
          gt: 10,
          lte: 11,
          color: '#be502a',
        },
        {
          gt: 11,
          lte: 12,
          color: '#a0351d',
        }
      ],
      active: true
    },
    {
      name: "海浪",
      type: "WAVE",
      mapServer: "WAVE/MapServer",
      chartName: "wave",
      icon: "iconFill",
      unit: "m",
      seriesLeftName: '浪向(°)',
      seriesRightName: '浪高(m)',
      pieces: [
        {
          gt: 0,
          lte: 1,
          color: '#e6f0ff',
        },
        {
          gt: 1,
          lte: 2,
          color: '#bee8ff',
        },
        {
          gt: 2,
          lte: 3,
          color: '#55c2ed',
        },
        {
          gt: 4,
          lte: 6,
          color: '#149bde',
        },
        {
          gt: 6,
          lte: 9,
          color: '#0074cc',
        },
        {
          gt: 9,
          lte: 14,
          color: '#ffff00',
        }
      ],
      active: false
    },
    {
      name: "海流",
      type: "CURRENT",
      mapServer: "CURRENT/MapServer",
      chartName: "current",
      icon: "iconliuliang",
      unit: "m/s",
      pieces: [
        {
          gt: 0,
          lte: 0.2,
          color: '#2b41ff',
        },
        {
          gt: 0.2,
          lte: 0.4,
          color: '#386dff',
        },
        {
          gt: 0.4,
          lte: 0.6,
          color: '#3b9dff',
        },
        {
          gt: 0.6,
          lte: 0.8,
          color: '#30cfff',
        },
        {
          gt: 0.8,
          lte: 1,
          color: '#00ffff',
        },
        {
          gt: 1,
          lte: 1.2,
          color: '#70ffdc',
        },
        {
          gt: 1.2,
          lte: 1.4,
          color: '#a1ffa4',
        },
        {
          gt: 1.4,
          lte: 1.6,
          color: '#c7ff78',
        },
        {
          gt: 1.6,
          lte: 1.8,
          color: '#e7ff4a',
        },
        {
          gt: 1.8,
          lte: 2,
          color: '#ffff00',
        },
        {
          gt: 2,
          lte: 2.2,
          color: '#ffd500',
        },
        {
          gt: 2.2,
          lte: 2.4,
          color: '#ffac00',
        },
        {
          gt: 2.4,
          lte: 2.6,
          color: '#ff7b00',
        },
        {
          gt: 2.6,
          lte: 2.8,
          color: '#ff4d00',
        },
        {
          gt: 2.8,
          color: '#923636',
        }
      ],
      active: false
    },
    {
      name: "海温",
      type: "TEMP",
      mapServer: "TEMP/MapServer",
      chartName: "sst",
      icon: "iconGroup1",
      unit: "m",
      seriesLeftName: '海温(°)',
      pieces: [
        {
          gt: 0,
          lte: 4,
          color: '#0000ff',
        },
        {
          gt: 4,
          lte: 6,
          color: '#293cff',
        },
        {
          gt: 6,
          lte: 8,
          color: '#3969ff',
        },
        {
          gt: 8,
          lte: 10,
          color: '#3992ff',
        },
        {
          gt: 10,
          lte: 12,
          color: '#31c3ff',
        },
        {
          gt: 12,
          lte: 14,
          color: '#18f3ff',
        },
        {
          gt: 14,
          lte: 16,
          color: '#5affe7',
        },
        {
          gt: 16,
          lte: 18,
          color: '#8cffbd',
        },
        {
          gt: 18,
          lte: 20,
          color: '#b5ff8c',
        },
        {
          gt: 20,
          lte: 22,
          color: '#d6ff63',
        },
        {
          gt: 22,
          lte: 24,
          color: '#efff39',
        },
        {
          gt: 24,
          lte: 26,
          color: '#fff300',
        },
        {
          gt: 26,
          lte: 28,
          color: '#ffcb00',
        },
        {
          gt: 28,
          lte: 30,
          color: '#ffa200',
        },
        {
          gt: 30,
          lte: 32,
          color: '#ff7500',
        },
        {
          gt: 32,
          lte: 34,
          color: '#ff4d00',
        },
        {
          gt: 34,
          lte: 36,
          color: '#ff0000',
        }
      ],
      active: false
    },
    {
      name: "盐度",
      type: "SAL",
      mapServer: "SAL/MapServer",
      chartName: "salinity",
      icon: "iconGroup3",
      unit: "",
      pieces: [
        {
          gt: 0,
          lte: 2,
          color: "#39f700",
        },
        {
          gt: 2,
          lte: 4,
          color: "#5af700",
        },
        {
          gt: 4,
          lte: 6,
          color: "#73f700",
        },
        {
          gt: 6,
          lte: 8,
          color: "#8cf700",
        },
        {
          gt: 8,
          lte: 10,
          color: "#a5f700",
        },
        {
          gt: 10,
          lte: 12,
          color: "#bdf700",
        },
        {
          gt: 12,
          lte: 14,
          color: "#e7f700",
        },
        {
          gt: 14,
          lte: 16,
          color: "#e7f700",
        },
        {
          gt: 16,
          lte: 18,
          color: "#f7f700",
        },
        {
          gt: 18,
          lte: 20,
          color: "#f7df00",
        },
        {
          gt: 20,
          lte: 22,
          color: "#ffc700",
        },
        {
          gt: 22,
          lte: 24,
          color: "#ffb200",
        },
        {
          gt: 24,
          lte: 26,
          color: "#ff9600",
        },
        {
          gt: 26,
          lte: 28,
          color: "#ff8200",
        },
        {
          gt: 28,
          lte: 30,
          color: "#ff6900",
        },
        {
          gt: 30,
          lte: 32,
          color: "#f73400",
        },
        {
          gt: 32,
          lte: 34,
          color: "#f73400",
        },
        {
          gt: 34,
          lte: 36,
          color: "#f70000",
        }
      ],
      active: false
    },
    {
      name: "天文潮",
      type: "TIDE",
      mapServer: "TIDE/MapServer",
      chartName: "tide",
      icon: "iconlang",
      unit: "m",
      pieces: [
        {
          gt: 4,
          color: "#ff0000",
        },
        {
          gt: 3,
          lte: 3.5,
          color: "#ff4d00",
        },
        {
          gt: 2.5,
          lte: 3,
          color: "#ff7500",
        },
        {
          gt: 2,
          lte: 2.5,
          color: "#ffa200",
        },
        {
          gt: 1.5,
          lte: 2,
          color: "#ffcb00",
        },
        {
          gt: 1,
          lte: 1.5,
          color: "#fff300",
        },
        {
          gt: 0.5,
          lte: 1,
          color: "#fdff34",
        },
        {
          gt: 0,
          lte: 0.5,
          color: "#d6ff63",
        },
        {
          gt: -0.5,
          lte: 0,
          color: "#b5ff8c",
        },
        {
          gt: -1,
          lte: -0.5,
          color: "#8cffbd",
        },
        {
          gt: -1.5,
          lte: -1,
          color: "#8cffbd",
        },
        {
          gt: -2,
          lte: -1.5,
          color: "#21dfe9",
        },
        {
          gt: -2.5,
          lte: -2,
          color: "#2bccff",
        },
        {
          gt: -3,
          lte: -2.5,
          color: "#2bccff",
        },
        {
          gt: -3.5,
          lte: -3,
          color: "#3969ff",
        },
        {
          gt: -3.5,
          color: "#293cff",
        }
      ],
      active: false
    }
  ]
  //通过rxjs获取数据
  getRxjsData(options) {
    return new Observable<any>((observer) => {
      this.http.get(options.origin ? options.origin + options.api : this.configUrl + options.api, { params: options.params }).subscribe((response: any) => {
        if (response.status !== 0) {
          observer.next(response);
        } else {
          return false;
        }
      }, (error) => {
        if (error.status == 403) {
        }
      })
    })
  }
  postRxjsData(options) {
    return new Observable<any>((observer) => {
      this.http.post(options.origin ? options.origin + options.api : this.configUrl + options.api, JSON.stringify(options.params), { headers: this.postHeaders }).subscribe(
        (response: any) => {
          this.msg.info(response.message);
          if (response.status) {
            observer.next();
          } else {
            return false;
          }
        },
        (error) => {
          if (error.status == 403) {
          }
        }
      );
    });

  }
  //获取项目列表
  getProjectList() {
    let options = {
      api: '',
      params: {
        Sidx: '0',
        Rows: '10000'
      }
    }
    return this.http.get(this.configUrl + options.api, { params: options.params});
  }
}
