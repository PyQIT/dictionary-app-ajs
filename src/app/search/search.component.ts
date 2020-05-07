import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  wordList: any;
  constructor( private route: ActivatedRoute,
    private router: Router, private http: ApiService) {}
  ngOnInit() {
  }

}
