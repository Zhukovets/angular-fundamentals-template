import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, debounceTime, filter, forkJoin, map, Observable, Subject, Subscription, switchMap } from 'rxjs';
import { MockDataService } from './services/mock-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
  searchTermByCharacters = new Subject<string>();
  charactersResults$!: Observable<any>;
  planetAndCharactersResults$!: Observable<any>;
  isLoading: boolean = false;
  subscriptions: Subscription[] = [];

  constructor(private mockDataService: MockDataService) {}

  ngOnInit(): void {
    this.initLoadingState();
    this.initCharacterEvents();
  }

  changeCharactersInput(element: any): void {
    const inputValue: string = element.target.value;
    this.searchTermByCharacters.next(inputValue);
  }

  initCharacterEvents(): void {
    this.charactersResults$ = this.searchTermByCharacters
        .pipe
          (map((input: string) => (input ? input.trim() : "")),
          filter(input => input.length >= 3),
          debounceTime(500),
          switchMap((input) => this.mockDataService.getCharacters(input))
        );
  }

  loadCharactersAndPlanet(): void { 
    this.planetAndCharactersResults$ = forkJoin([this.mockDataService.getCharacters(),this.mockDataService.getPlatents()]);
  }

  initLoadingState(): void {
    const stream1 = this.mockDataService.getCharactersLoader();
    const stream2 = this.mockDataService.getPlanetLoader();
    let result:boolean[] = [];
    this.subscriptions.push(combineLatest({stream1,stream2}).subscribe((value) => {result.push(value.stream1,value.stream2)}));
    if (this.areAllValuesTrue(result)){
      this.isLoading = true;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.map(subscription => subscription.unsubscribe);
  }

  areAllValuesTrue(elements: boolean[]): boolean {
    return elements.every((el) => el);
  }
}
