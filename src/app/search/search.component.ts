import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import {Word} from '../word';
import {AngularFireDatabase} from 'angularfire2/database';
import {ToastrService} from 'ngx-toastr';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(':enter',
      [style({ opacity: 0 }), stagger('60ms', animate('600ms ease-out', style({ opacity: 1 })))],
      { optional: true }
    ),
    query(':leave',
      animate('200ms', style({ opacity: 0 })),
      { optional: true}
    )
  ])
]);

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [listAnimation]
})
export class SearchComponent implements OnInit {

  printWords: Word[] = [];
  words: Word[] = [];
  languageType = 'en';
  languageTypebool = false;
  submitted = false;
  tmpLanguageType = 'start';
  tmpUserWord = 'ToSlowoNigdyNieBedzieTakieSamoJakWpisanePrzezUzytkownika_#Potwierdzone:)_19.05.2020_BylemTu_20.05.2020_JaTez';

  constructor( private route: ActivatedRoute,
               private router: Router, private http: ApiService,
               private db: AngularFireDatabase,
               private toastr: ToastrService) {}
  ngOnInit() {
  }

  changeLanguage() {
    if (this.languageType === 'pl') {
      this.languageType = 'en';
      this.languageTypebool = false;
    } else {
      this.languageType = 'pl';
      this.languageTypebool = true;
    }
    console.log(this.languageType);
  }

  searchWords(userWord) {
    let tmp = 0;
    console.log(this.languageType + '   ' + this.tmpLanguageType);
    if (userWord !== this.tmpUserWord || this.languageType !== this.tmpLanguageType) {
      this.tmpUserWord = userWord;
      this.tmpLanguageType = this.languageType;
      if (userWord === '' || userWord === undefined) {
        this.submitted = false;
        this.toastr.error(`Pole wyszukiwania nie może być puste.`, `Błąd wyszukiwania!`);
      } else {
        const x = this.db.list('words');
        x.snapshotChanges().subscribe(item => {
          // tslint:disable-next-line:no-shadowed-variable
          item.forEach(element => {
            const y = element.payload.toJSON();
            y['$key'] = element.key;
            this.words.push(y as Word);
            if (y[this.languageType].startsWith(userWord)) {
              this.printWords.push(<Word>y);
              if (tmp === 0) {
                this.submitted = true;
                this.toastr.success(`Znaleziono szukane słowo.`, `Sukces!`);
                tmp++;
              }
            }
          });
          if (tmp === 0) {
            this.submitted = false;
            this.toastr.error(`Brak podanego słowa w systemie.`, `Nie znaleziono słowa!`);
          }
        });
      }
    }
    this.printWords = [];
    this.submitted = false;
  }

  autoSearchWords(userWord) {
    let tmp = 0;
    console.log(this.languageType + '   ' + this.tmpLanguageType);
    if (userWord !== this.tmpUserWord || this.languageType !== this.tmpLanguageType) {
      this.tmpUserWord = userWord;
      this.tmpLanguageType = this.languageType;
      if (userWord === '' || userWord === undefined) {
        this.submitted = false;
      } else {
        const x = this.db.list('words');
        x.snapshotChanges().subscribe(item => {
          // tslint:disable-next-line:no-shadowed-variable
          item.forEach(element => {
            const y = element.payload.toJSON();
            y['$key'] = element.key;
            this.words.push(y as Word);
            if (y[this.languageType].startsWith(userWord)) {
              this.printWords.push(<Word>y);
              if (tmp === 0) {
                this.submitted = true;
                tmp++;
              }
            }
          });
          if (tmp === 0) {
            this.submitted = false;
          }
        });
      }
    }
    this.printWords = [];
  }
}
