import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import {Word} from '../word';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  words: Word[] = [];

  constructor( private route: ActivatedRoute,
               private router: Router, private http: ApiService,
               private db: AngularFireDatabase) {}
  ngOnInit() {
  }

  searchWords(userWord, languageType) {
    const x = this.db.list('words');
    x.snapshotChanges().subscribe(item => {
      // tslint:disable-next-line:no-shadowed-variable
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.words.push(y as Word);
        console.log(y);
      });
    });
  }
}
