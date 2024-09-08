import { Component, OnDestroy, OnInit } from "@angular/core";
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
} from "rxjs";
import { MockDataService } from "./mock-data.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
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

  changeCharactersInput(element: Event): void {
    const inputValue: string = (element.target as HTMLInputElement).value;
    this.searchTermByCharacters.next(inputValue);
  }

  initCharacterEvents(): void {
    this.charactersResults$ = this.searchTermByCharacters.pipe(
      debounceTime(500),
      filter((searchTerm: string) => searchTerm.length >= 3),
      switchMap((searchTerm: string) =>
        this.mockDataService.getCharacters(searchTerm)
      )
    );
  }

  loadCharactersAndPlanet(): void {
    interface Character {
      name: string;
    }
    interface Planet {
      name: string;
    }
    type Characters = Character[];
    type Planets = Planet[];

    interface Result {
      characters: Characters;
      planets: Planets;
    }

    this.planetAndCharactersResults$ = forkJoin({
      characters: this.mockDataService.getCharacters(),
      planets: this.mockDataService.getPlanets(),
    }).pipe(
      map(({ characters, planets }: Result) => {
        const characterNames = characters.map((character) => character.name);
        const planetNames = planets.map((planet) => planet.name);
        return [...characterNames, ...planetNames];
      })
    );
    const resultsSubscription = this.planetAndCharactersResults$.subscribe(
      (result) => {
        const resultContainer = document.createElement("div");
        resultContainer.style.textAlign = "center";
        resultContainer.style.margin = "auto";
        resultContainer.innerHTML = result
          .map((item: string) => `<div>${item}</div>`)
          .join("");
        document.body.append(resultContainer);
      }
    );
    this.subscriptions.push(resultsSubscription);
  }

  initLoadingState(): void {
    const loadingSubscription = combineLatest([
      this.mockDataService.getCharactersLoader(),
      this.mockDataService.getPlanetLoader(),
    ])
      .pipe(
        map((loadingStates: boolean[]) => {
          return this.areAllValuesTrue(loadingStates);
        })
      )
      .subscribe((loadingState: boolean) => {
        this.isLoading = loadingState;
      });
    this.subscriptions.push(loadingSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe);
  }

  areAllValuesTrue(elements: boolean[]): boolean {
    return elements.every((el) => el);
  }
}
