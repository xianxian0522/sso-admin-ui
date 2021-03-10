import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {BaseRepository} from '../../share/services/base.repository';
import {ActivatedRoute} from '@angular/router';
import {NzTableComponent} from 'ng-zorro-antd/table';
import {merge} from 'rxjs';
import {debounceTime, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.less']
})
export class ClientListComponent implements OnInit, AfterViewInit {

  constructor(
    private baseRepository: BaseRepository<any>,
    private activatedRoute: ActivatedRoute,
  ) { }

  listOfData = [];
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
        return this.baseRepository.queryPage(this.table?.nzPageIndex as number, this.table?.nzPageSize as number);
      })
    ).subscribe(res => {
      console.log(res, 'list');
    });
  }

  updatePassword(): void {

  }
  updateUserInfo(): void {

  }
  logout(): void {

  }

}
