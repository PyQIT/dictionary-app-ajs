import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  filter
} from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {
  searchField: FormControl = new FormControl();
  wordList: any;
  displayList = false;
  public href;
  constructor(private router: Router, private http: ApiService, private toastr: ToastrService) {}
  ngOnInit() {
    this.searchField.valueChanges
      .pipe(
        filter(value => !value || value.length > 2 || value !== ''),
        debounceTime(300),
        distinctUntilChanged(),
        filter(value => value !== ''),
        // prettier-ignore
        switchMap( query => query.length > 2 ? this.http.getWords(query) : this.wordList = ' ')
      )
      .subscribe(
        data => {
          this.wordList = '';
          this.displayList = true;
          this.wordList = data;
          // if (data['metadata']['total'].length === 0) {
          //   this.toastr.error(`Try Again with valid word 😕`);
          // }
         // console.log(this.wordList);
        },
        error => {
          console.log(error);
          if (error.status === 404 || error.status === 414) {
            this.toastr.error(`Try Again with valid word😭`, `${error.statusText}`);
          } else if (error.status === 403) {
            this.toastr.error(`Details in About Page🙇`, `Contact Developer`);
          } else if (error.status === 500) {
            this.toastr.warning(`Something is broken 💔`, `Contact Developer`);
          } else if (error.status === 502) {
            this.toastr.info(`Oxford Dictionaries API is down or being upgraded 👻`, `Bad Gateway`);
          } else if (error.status === 503) {
            this.toastr.info(`Please try again later 😕`, `Service Unavailable`);
          } else if (error.status === 504) {
            this.toastr.info(`Please try again later 😥`, `Gateway timeout`);
          }
        }
      );
  }

  onBlur(value) {
    this.displayList = false;
  }
  onFocus(value) {
    if (value.length > 0) {
      this.displayList = true;
    } else {
      this.displayList = false;
    }
  }
  onListClick(e) {
    this.href = this.router.url.split('/');
    if (this.href.indexOf('definition') > -1) {
      this.displayList = false;
    }
    e.stopPropagation();
    this.router.navigate([e.target.children['0'].pathname]);
    // console.log(e);
    // console.log(e.target.children['0'].computedName);
  }
  btnClick(value) {
    // console.log(value);
    const letters = /^[A-Za-z ]*$/;
    // const regx: any = ^[a-zA-Z ]*$;
    // console.log(exp.match(value));
    // console.log(value.match(letters));
    const regRes = value.match(letters);
   // console.log(regRes.input);
    if (regRes === null || value === '') {
      alert('Please Enter a word');
    } else {
     // console.log('Proceed');
      this.router.navigate(['/definition', value]);
    }
  }
}
