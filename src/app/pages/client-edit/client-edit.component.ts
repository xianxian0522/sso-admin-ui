import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.less']
})
export class ClientEditComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
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

  }
  onSubmit(): void {

  }
}
