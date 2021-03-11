import { Component, OnInit } from '@angular/core';
import {BaseRepository} from '../../share/services/base.repository';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(
    private baseRepository: BaseRepository<any>,
    private messageService: NzMessageService,
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    this.baseRepository.login().subscribe(res => {
      if (res.code === 200) {
        window.location.href = res.data as string;
      } else {
        this.messageService.info(res.msg as string);
      }
    }, err => this.messageService.error(err.error.message));
  }
}
