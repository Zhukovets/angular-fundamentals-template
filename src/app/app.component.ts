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
    this.charactersResults$ = this.searchTermByCharacters.pipe(
      filter((input) => input.length >= 3),
      debounceTime(300),
      switchMap((input) => this.mockDataService.getCharacters(input))
    );
  }

  loadCharactersAndPlanet(): void {
    this.planetAndCharactersResults$ = forkJoin({
      characters: this.mockDataService.getCharacters(''),
      planets: this.mockDataService.getPlanets(),
    }).pipe(
      map(({ characters, planets }) => [
        ...characters.map((char: any) => char.name),
        ...planets.map((planet: any) => planet.name),
      ])
    );
  }

  initLoadingState(): void {
    const charactersLoader$ = this.mockDataService.getCharactersLoader();
    const planetLoader$ = this.mockDataService.getPlanetLoader();

    const combinedLoader$ = combineLatest([charactersLoader$, planetLoader$]).pipe(
      map(([charLoading, planetLoading]) => this.areAllValuesTrue([charLoading, planetLoading]))
    );

    this.subscriptions.push(
      combinedLoader$.subscribe((loading) => (this.isLoading = loading))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  areAllValuesTrue(elements: boolean[]): boolean {
    return elements.every((el) => el);
  }
}
