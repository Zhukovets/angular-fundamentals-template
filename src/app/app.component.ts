import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  // pobiera najbardziej aktualne dane, laczy je i wysyla do obserwtora jak tablice
  combineLatest,
  // opóźnia wywołanie funkcji o podany czas
  debounceTime,
  filter,
  // pozwala na pobranie danych z kilku źródeł. Wynik zwraca, dopiero gdy dane zostaną pobrane  wszystkich strumieni danych.
  forkJoin,
  Observable,
  //  Do subjecta można się zasubskrybować, ale jednocześnie udostępnia nam on też metody obserwatora (next/error/complete)
  Subject,
  Subscription,
  // emituje wartości wewnętrznego Observable, ale każda nowa wartość emitowana przez strumień źródłowy powoduje anulowanie poprzedniego wewnętrznego Observable i utworzenie nowego
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

  changeCharactersInput(element: any): void {
    // 1.1. Add functionality to changeCharactersInput method. Changes searchTermByCharacters Subject value on input change.
    const inputValue: string = element.target.value;
    // YOUR CODE STARTS HERE
    this.searchTermByCharacters.next(inputValue);
    // YOUR CODE ENDS HERE
  }

  initCharacterEvents(): void {
    // 1.2. Add API call on each user input. Use mockDataService.getCharacters - to make get request.

    // 2. Since we don't want to spam our service add filter by input value and do not call API until a user enters at least 3 chars.

    // 3. Add debounce to prevent API calls until user stop typing.

    this.charactersResults$ = this.searchTermByCharacters.pipe(
      debounceTime(300), // 3. Add debounce to prevent API calls until user stop typing.
      filter((input: string) => input.length >= 3), // 2. Do not call API until user enters at least 3 chars.
      switchMap((input: string) => this.mockDataService.getCharacters(input)) // 1.2. API call to get characters
    );
  }

  loadCharactersAndPlanet(): void {
    // 4. On clicking the button 'Load Characters And Planets', it is necessary to process two requests and combine the results of both requests into one result array. As a result, a list with the names of the characters and the names of the planets is displayed on the screen.
    // Your code should looks like this: this.planetAndCharactersResults$ = /* Your code */
    // YOUR CODE STARTS HERE
    this.planetAndCharactersResults$ = forkJoin([
      this.mockDataService.getCharacters(), // Get characters
      this.mockDataService.getPlanets(), // Get planets
    ]).pipe(
      switchMap(([characters, planets]) => {
        // Combine both arrays into one result list
        return [...characters, ...planets];
      })
    );
    // YOUR CODE ENDS HERE
  }

  initLoadingState(): void {
    /* 5.1. Let's add loader logic to our page. For each request, we have an observable that contains the state of the request. When we send a request the value is true, when the request is completed, the value becomes false. You can get value data with mockDataService.getCharactersLoader() and mockDataService.getPlanetLoader().

    - Combine the value of each of the streams.
    - Subscribe to changes
    - Check the received value using the areAllValuesTrue function and pass them to the isLoading variable. */
    // YOUR CODE STARTS HERE
    const characterLoader$ = this.mockDataService.getCharactersLoader();
    const planetLoader$ = this.mockDataService.getPlanetLoader();

    const loadingSubscription = combineLatest([
      characterLoader$,
      planetLoader$,
    ]).subscribe(([isCharactersLoading, isPlanetsLoading]) => {
      this.isLoading = this.areAllValuesTrue([
        isCharactersLoading,
        isPlanetsLoading,
      ]); // Check if both are loading
    });

    this.subscriptions.push(loadingSubscription); // Add to the subscriptions array
    // YOUR CODE ENDS HERE
  }

  ngOnDestroy(): void {
    // 5.2 Unsubscribe from all subscriptions
    // YOUR CODE STARTS HERE
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    // YOUR CODE ENDS HERE
  }

  areAllValuesTrue(elements: boolean[]): boolean {
    return elements.every((el) => el);
  }
}
