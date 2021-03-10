import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {BaseRepository} from '../../share/services/base.repository';
import {NzTableComponent} from 'ng-zorro-antd/table';
import {merge} from 'rxjs';
import {debounceTime, map, switchMap} from 'rxjs/operators';
import {ClientList} from '../../share/mode/client';
import {NzModalService} from 'ng-zorro-antd/modal';
import {UserEditComponent} from '../user-edit/user-edit.component';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.less']
})
export class ClientListComponent implements OnInit, AfterViewInit {

  constructor(
    private baseRepository: BaseRepository<any>,
    private modalService: NzModalService,
  ) { }

  username = '';
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
        this.total = data.data.Total;
        return data.data.Content;
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
      this.username = user.data.username as string;
      this.userInfo = user.data;
    });
  }
  updatePassword(): void {

  }
  updateUserInfo(): void {
    this.modalService.create({
      nzContent: UserEditComponent,
      nzFooter: null,
      nzComponentParams: {mode: 'info', data: this.userInfo}
    }).afterClose.subscribe(_ => {
      console.log(_, '__');
    });
  }
  logout(): void {
    localStorage.removeItem('token');
    this.refresh.emit();
  }

}
