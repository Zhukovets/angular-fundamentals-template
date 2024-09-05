import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  combineLatest,
  debounceTime,
  filter,
  forkJoin,
  map,
  Observable,
  Subject,
  Subscription,
  switchMap,
} from 'rxjs';
import { MockDataService } from './mock-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
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
        .pipe(
          debounceTime(500),
          filter((searchTerm: string) => searchTerm.length >= 3),
          switchMap((searchTerm: string) => 
            this.mockDataService.getCharacters(searchTerm)
          )
        );
  }

  loadCharactersAndPlanet(): void {
    this.planetAndCharactersResults$ = forkJoin([
      this.mockDataService.getCharacters(),
      this.mockDataService.getPlanets(),
    ]).pipe(
      map(([characters, planets]) => {
        return [...characters, ...planets];
      })
    );
  }

  initLoadingState(): void {
    this.subscriptions.push(
      combineLatest([
        this.mockDataService.getCharactersLoader(),
        this.mockDataService.getPlanetLoader(),
      ])
        .pipe(
          map((loaders) => this.areAllValuesTrue(loaders))
        )
        .subscribe((isLoading) => {
          this.isLoading = isLoading;
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  areAllValuesTrue(elements: boolean[]): boolean {
    return elements.every((el) => el);
  }
}
