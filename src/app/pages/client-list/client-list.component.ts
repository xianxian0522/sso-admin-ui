import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {BaseRepository} from '../../share/services/base.repository';
import {NzTableComponent} from 'ng-zorro-antd/table';
import {merge} from 'rxjs';
import {debounceTime, map, switchMap} from 'rxjs/operators';
import {ClientList} from '../../share/mode/client';
import {NzModalService} from 'ng-zorro-antd/modal';
import {UserEditComponent} from '../user-edit/user-edit.component';
import {ClientEditComponent} from '../client-edit/client-edit.component';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.less']
})
export class ClientListComponent implements OnInit, AfterViewInit {

  constructor(
    private baseRepository: BaseRepository<any>,
    private modalService: NzModalService,
    private messageService: NzMessageService,
  ) { }

  username = '用户名';
  userInfo: any;
  listOfData: ClientList[] = [];
  total = 1;
  pageSize = 10;
  pageIndex = 1;
  isLoading = false;
  @ViewChild(NzTableComponent) table!: NzTableComponent;
  @Output() refresh = new EventEmitter<string>();

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    merge(this.table.nzPageSizeChange,
      this.table?.nzPageIndexChange as EventEmitter<number>,
      this.refresh
    ).pipe(
      debounceTime(200),
      switchMap(_ => {
        this.isLoading = true;
        return this.baseRepository.queryPage(this.table.nzPageIndex, this.table?.nzPageSize);
      }),
      map(data => {
        this.isLoading = false;
        if (data.code === 200) {
          this.total = data.data.Total;
          return data.data.Content;
        }
      })
    ).subscribe(res => {
      this.listOfData = res;
      // console.log(res, 'list');
    });

    this.refresh.emit();
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.baseRepository.userInfo().subscribe(user => {
      if (user.code === 200) {
        this.username = user.data.realName as string;
        this.userInfo = user.data;
      } else {
        this.messageService.warning(user.msg as string);
      }
    });
  }
  updatePassword(): void {
    this.modalService.create({
      nzTitle: '修改密码',
      nzContent: UserEditComponent,
      nzFooter: null,
      nzComponentParams: {mode: 'password', data: this.userInfo},
    }).afterClose.subscribe(_ => {
      if (_ && _.code === 200) {
        this.getUserInfo();
      }
    });
  }
  updateUserInfo(): void {
    this.modalService.create({
      nzTitle: '修改信息',
      nzContent: UserEditComponent,
      nzFooter: null,
      nzComponentParams: {mode: 'info', data: this.userInfo},
    }).afterClose.subscribe(_ => {
      if (_ && _.code === 200) {
        this.getUserInfo();
      }
    });
  }
  logout(): void {
    localStorage.removeItem('token');
    this.refresh.emit();
  }

  updateByIds(id: number): void {
    this.baseRepository.updateByIds(id).subscribe(_ => {
      if (_.code === 200) {
        this.messageService.success('更新密钥成功');
        this.refresh.emit();
      } else {
        this.messageService.success(_.msg);
      }
    });
  }
  cancel(): void {
    this.messageService.info('取消操作');
  }
  update(ele: { [key: string]: any }): void {
    this.modalService.create({
      nzTitle: '修改',
      nzComponentParams: {data: ele},
      nzContent: ClientEditComponent,
      nzFooter: null,
    }).afterClose.subscribe(_ => {
      if (_ && _.code === 200) {
        this.refresh.emit();
      }
    });
  }
  delete(id: number): void {
    this.baseRepository.delete(id).subscribe(_ => {
      if (_.code === 200) {
        this.messageService.success('删除成功');
        this.refresh.emit();
      } else {
        this.messageService.success(_.msg);
      }
    });
  }

}
