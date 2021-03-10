import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {BaseRepository} from '../../share/services/base.repository';
import {ActivatedRoute} from '@angular/router';
import {NzTableComponent} from 'ng-zorro-antd/table';
import {merge} from 'rxjs';
import {debounceTime, map, switchMap} from 'rxjs/operators';
import {ClientList} from '../../share/mode/client';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.less']
})
export class ClientListComponent implements OnInit, AfterViewInit {

  constructor(
    private baseRepository: BaseRepository<any>,
    private activatedRoute: ActivatedRoute,
    private messageService: NzMessageService,
  ) { }

  username = '';
  listOfData: ClientList[] = [];
  total = 1;
  pageSize = 10;
  pageIndex = 1;
  isLoading = false;
  @ViewChild(NzTableComponent) table: NzTableComponent | undefined;
  @Output() refresh = new EventEmitter<string>();

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      // console.log(params, 'params', params.state);
      this.baseRepository.token(params.state, params.code).subscribe(res => {
        localStorage.setItem('token', res.data as string);
        this.refresh.emit();
        this.getUserInfo();
        // if (res.code === 200) {
        //   console.log('页面刷新没有token？', res);
        //   localStorage.setItem('token', res.data as string);
        //   this.refresh.emit();
        //   this.getUserInfo();
        // } else {
        //   this.messageService.warning(res.msg as string);
        // }
      });
    });
  }

  ngAfterViewInit(): void {
    merge(this.table?.nzPageSizeChange as EventEmitter<number>,
      this.table?.nzPageIndexChange as EventEmitter<number>,
      this.refresh
    ).pipe(
      debounceTime(200),
      switchMap(_ => {
        this.isLoading = true;
        return this.baseRepository.queryPage(this.table?.nzPageIndex as number, this.table?.nzPageSize as number);
      }),
      map(data => {
        this.isLoading = false;
        this.total = data.data.Total;
        return data.data.Content;
      })
    ).subscribe(res => {
      this.listOfData = res;
      // console.log(res, 'list');
    });
  }

  getUserInfo(): void {
    this.baseRepository.userInfo().subscribe(user => {
      this.username = user.data.username as string;
    });
  }
  updatePassword(): void {

  }
  updateUserInfo(): void {

  }
  logout(): void {
    localStorage.removeItem('token');
    this.refresh.emit();
  }

}
