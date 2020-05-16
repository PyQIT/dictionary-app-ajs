import { Component, OnInit } from '@angular/core';
import { Word } from '../word';
import { WordService} from '../word-service';
import {ToastrService} from 'ngx-toastr';
import * as _ from 'lodash';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  word: Word = new Word();
  submitted = false;

  constructor(private wordService: WordService,
              private toastr: ToastrService) { }

  ngOnInit() {
  }

  save() {
    if (_.isEmpty(this.word.en) || _.isEmpty(this.word.pl) ) {
      this.handleAnswer(400);
    } else {
      this.handleAnswer(this.wordService.createWord(this.word));
      this.word = new Word();
    }
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  handleAnswer(answer) {
    if (answer === 400) {
      this.toastr.error(`Something went wrong. Try Again`, `Missing word`);
    } else {
      this.toastr.success('Dodano nowe tłumaczenie.', 'Sukces!');
      console.log(answer);
    }
  }
}
