import { Component, OnInit } from '@angular/core';
import { ServersService } from '../../servers.service';

@Component({
  selector: 'app-video-play',
  templateUrl: './video-play.component.html',
  styleUrls: ['./video-play.component.less']
})
export class VideoPlayComponent implements OnInit {
  //API
  public api_list_vedio_pinhu = '/jx/pinghuvideo';//平湖视频列表
  public api_list_vedio_haiyan = '/jx/haiyanvideo'//海盐视频列表

  //其他参数
  public loading = false; //预加载
  public displayData = [];
  public selectedType = 'pinhu';
  public isVisible = false;
  public fileObj:any = {};
  public isSpinning = true;
  constructor(public server: ServersService) { }

  ngOnInit() {
    this.server.isDataForecast = false;
    this.getVedioList('pinhu');
  }
  //获取视频列表
  getVedioList(key){
    this.selectedType = key;
    let options = {
      api: this.selectedType == 'pinhu' ? this.api_list_vedio_pinhu : this.api_list_vedio_haiyan,
      params: {
        date: '2019-10-9',
      }
    }
    this.loading = true;
    this.server.getRxjsData(options).subscribe((data) => {
      this.displayData = data;
      this.loading = false;
      this.isSpinning = false;
    })
  }
  //搜索数据
  searchData(){
    
  }
  //播放视频
  playVideo(item){
    this.isVisible = true;
    this.fileObj = {
      filename: item.filename,
      path: this.selectedType == 'pinhu' ? "https://xxs.dhybzx.org:3000/jx/pinghuvideo/" + item.filename : "https://xxs.dhybzx.org:3000/jx/haiyanvideo/" + item.filename
    }
  }
  handleCancel(){
    this.isVisible = false;
  }
  

}
