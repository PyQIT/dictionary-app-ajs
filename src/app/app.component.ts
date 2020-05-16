import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase} from 'angularfire2/database';
import { Word } from './word';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  words: Word[] = [];

  constructor(private db: AngularFireDatabase) {}

  ngOnInit() {
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
