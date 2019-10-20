import { Component, OnInit } from '@angular/core';
import { ServersService } from '../../servers.service';
@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.less']
})
export class DefaultComponent implements OnInit {

  constructor(public server:ServersService) { }

  ngOnInit() {
  }

}
