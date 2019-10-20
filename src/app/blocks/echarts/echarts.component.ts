import { Component, OnInit, Input, ElementRef,OnChanges, SimpleChanges} from '@angular/core';
import * as echarts from 'echarts';
@Component({
  selector: 'app-echarts',
  templateUrl: './echarts.component.html',
  styleUrls: ['./echarts.component.less']
})
export class EchartsComponent implements OnChanges,OnInit {
  @Input() chartOption: any; //接收父组件传递的图表配置参数
  constructor(private el: ElementRef) { 
  }
  //判断组件绑定值变化
  ngOnChanges(changes: SimpleChanges) {
    // echarts.init(this.el.nativeElement).setOption(this.chartOption);
  }
  ngOnInit() {

  }

}
