import { Component, OnInit } from '@angular/core';
import { Word } from '../word';
import { WordService} from '../word-service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  word: Word = new Word();
  submitted = false;

  constructor(private wordService: WordService) { }

  ngOnInit() {
  }

  newWord(): void {
    this.submitted = false;
    this.word = new Word();
  }

  save() {
    this.wordService.createWord(this.word);
    this.word = new Word();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }
}
