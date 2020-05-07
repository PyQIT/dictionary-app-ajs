import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { unionBy, uniq, sortBy } from 'lodash-es';
@Component({
  selector: 'app-full-view',
  templateUrl: './full-view.component.html',
  styleUrls: ['./full-view.component.scss']
})
export class FullViewComponent implements OnInit {
  public fullData;
  public resultsObj = {};
  public lexicalEntries = [];
  public residueRemoved = [];
  public wordOrigin;
  public varientForms = [];
  public show = false;
  public notes = [];
  public currentWord;
  public antonyms = [];
  public synonyms = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: ApiService,
    private location: Location,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    // Get the parameter from the URL
    this.route.params.subscribe(routeParams => {
      this.currentWord = routeParams.id;
      this.http.getDefinition(routeParams.id).subscribe(
        data => {
          this.fullData = data;
          this.updateData(this.fullData);
        },
        error => {
          this.handleError(error);
        }
      );
    });
  }
  updateData(data) {
    this.resultsObj = data.results['0'];
    this.lexicalEntries = this.resultsObj['lexicalEntries'];
    // Remove Residue data from the full data
    this.residueRemoved = this.lexicalEntries.filter(
      lexicalEntry => lexicalEntry.lexicalCategory !== 'Residual'
    );
    // make  arrays empty for the new data
    this.varientForms = [];
    this.antonyms = [];
    this.synonyms = [];
    this.notes = [];
    this.wordOrigin = '';
    this.extractData(this.residueRemoved);
  }
  play(audio) {
    audio.play(); // play audio on clicking speak icon
  }
  extractData(data) {
    for (const singleData of data) {
     // console.log(singleData);
      // Extracting Word Origin data
      if (singleData.entries['0'].etymologies) {
        this.wordOrigin = singleData.entries['0'].etymologies;
      }
      // Extracting Varient Forms data
      if (singleData.entries['0'].hasOwnProperty('variantForms')) {
        this.varientForms.push(singleData.entries['0'].variantForms['0'].text);
      }
      // "MyCamelCaseString".replace(/([a-z](?=[A-Z]))/g, '$1 ')
      // Extract notes
      if (singleData.entries['0'].hasOwnProperty('notes')) {
        // console.log(singleData.entries['0'].notes);
        const temp = [];
        for (const note of singleData.entries['0'].notes) {
          temp.push(note);
        }
        const not = unionBy(temp, 'text');
        this.notes = not;
      }
    }
    this.getSyn();
    this.toastr.success(`Definition of ${this.resultsObj['word']} is Loaded 😉`);
  }
  // API request to get the synonyms and antonynms
  getSyn() {
    this.http.getSynAnt(this.currentWord).subscribe(
      data => {
      const datas = data;
      // console.log(datas.results['0'].lexicalEntries);
      this.seprateData(datas);
    },
    error => {
     // this.handleError(error);
     console.log(error);
    }
  );
  }
  // Seprate Synonyms and Antonyms from the stock data into their arrays
  seprateData(datas) {
    const synonyms = [];
    const antonyms = [];
    for (const data of datas.results['0'].lexicalEntries) {
      // console.log(data.entries['0'].senses);
      for (const syn of data.entries['0'].senses) {
        if (syn.synonyms) {
          synonyms.push(syn.synonyms);
        }
        if (syn.antonyms) {
          antonyms.push(syn.antonyms);
        }
      }
    }
    this.seperateSyn(synonyms);
    this.seperateAnt(antonyms);
  }
  // Seperate antonyms and synonyms
  seperateSyn(data) {
    const temp = [];
    data.map(i => {
      i.map(j => {
        temp.push(j.text);
      });
    });
    // console.log(sortBy(uniq(temp)));
    this.synonyms = sortBy(uniq(temp));
  }
  seperateAnt(data) {
    const temp = [];
    data.map(i => {
      i.map(j => {
        temp.push(j.text);
      });
    });
   // console.log(this.antonyms);
   this.antonyms = sortBy(uniq(temp));
  }
  // Function to handle error responses from the API server
  handleError(error) {
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
}
