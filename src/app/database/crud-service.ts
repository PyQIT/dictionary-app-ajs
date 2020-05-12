import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Words } from './words';

@Injectable({
  providedIn: 'root'
})

export class CrudService {
  wordsRef: AngularFireList<any>;
  wordRef: AngularFireObject<any>;


  constructor(private db: AngularFireDatabase) {
  }

  AddWords(words: Words) {
    this.wordsRef.push({
      pl: words.pl,
      ang: words.ang
    });
  }

  GetWords(id: string) {
    this.wordRef = this.db.object('words-list/' + id);
    return this.wordRef;
  }

  GetUsersList() {
    this.wordsRef = this.db.list('words-list');
    return this.wordsRef;
  }

}
