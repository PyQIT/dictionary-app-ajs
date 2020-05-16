import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Word } from './word';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  private dbPath = '/words';

  wordsRef: AngularFireList<Word> = null;

  constructor(private db: AngularFireDatabase) {
    this.wordsRef = db.list(this.dbPath);
  }

  createWord(word: Word): void {
    this.wordsRef.push(word);
  }
}
