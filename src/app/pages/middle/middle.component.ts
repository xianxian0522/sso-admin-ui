import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseRepository} from '../../share/services/base.repository';

@Component({
  selector: 'app-middle',
  templateUrl: './middle.component.html',
  styleUrls: ['./middle.component.less']
})
export class MiddleComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private baseRepository: BaseRepository<any>,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      // console.log(params, 'params');
      this.baseRepository.token(params.state, params.code).subscribe(res => {
        localStorage.setItem('token', res.data as string);
        this.router.navigateByUrl('/client');
      });
    });
  }

}
