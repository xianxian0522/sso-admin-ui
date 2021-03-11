import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {BaseRepository} from '../../share/services/base.repository';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.less']
})
export class UserEditComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef,
    private baseRepository: BaseRepository<any>,
    private messageService: NzMessageService,
  ) { }

  @Input() data: any;
  @Input() mode!: string;
  editForm = this.fb.group({
    // username: ['', Validators.required],
    lastPassword: ['', Validators.required],
    password: ['', Validators.required],
    mobile: [], // 修改密码和信息都有
    email: [],
    realName: [],
  });

  ngOnInit(): void {
    this.editForm.patchValue({...this.data});
  }

  onCancel(): void {
    this.modalRef.close();
  }
  onSubmit(): void {
    const value = {...this.editForm.value};
    (this.mode === 'info' ? this.baseRepository.updateUserInfo(value) :
      this.baseRepository.updatePassword(value)).subscribe(res => {
      if (res.code === 200) {
        this.messageService.success('修改成功');
        this.modalRef.close(res);
      } else {
        this.messageService.warning(res.msg);
      }
    }, err => {
        this.messageService.error(err.error.message);
        this.modalRef.close(err);
    });
  }
}
