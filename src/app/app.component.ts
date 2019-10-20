import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NzIconService } from 'ng-zorro-antd';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  constructor(public router: Router, public routerActive: ActivatedRoute, private _iconService: NzIconService) {
    //设置iconfont
    this._iconService.fetchFromIconfont({
      scriptUrl: '//at.alicdn.com/t/font_1448462_gy5eyz1e42l.js'
    });
  }
  ngOnInit() {
  }
}
