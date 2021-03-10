import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.less']
})
export class UserEditComponent implements OnInit {

  constructor() { }

  @Input() data: any;
  @Input() mode!: string;

  ngOnInit(): void {
  }

}
