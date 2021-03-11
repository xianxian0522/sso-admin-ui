import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {BaseRepository} from '../../share/services/base.repository';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.less']
})
export class ClientEditComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef,
    private messageService: NzMessageService,
    private baseRepository: BaseRepository<any>,
  ) { }

  @Input() data!: {[key: string]: any};
  editForm = this.fb.group({
    id: [],
    active: [],
    domain: [],
    name: [],
    redirectUrl: [],
    scope: [],
  });

  ngOnInit(): void {
    console.log(this.data, 'data');
    // this.editForm.patchValue({...this.data});
  }

  onCancel(): void {
    this.modalRef.close();
  }
  onSubmit(): void {
    const value = {...this.editForm.value};
    this.baseRepository.update(value).subscribe(res => {
      console.log(res, 'update res');
      if (res.code === 200) {
        this.messageService.success('更新成功');
      } else {
        this.messageService.info(res.msg);
      }
    }, err => {
      this.messageService.error(err.error.message);
    });
  }
}
