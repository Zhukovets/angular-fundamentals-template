import { Component, OnDestroy } from '@angular/core';
import { Subject, forkJoin, combineLatest, Subscription } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'courses-app';
  searchTermByCharacters = new Subject<string>();
  planetAndCharactersResults$: any[] = [];
  isLoading = false;
  subscriptions: Subscription[] = [];

   constructor(private mockDataService: MockDataService) {
    this.initializeCharacterSearch();
    this.initializeLoadingState();
  }

  changeCharactersInput(value: string): void {
    this.searchTermByCharacters.next(value); 
  }

  initializeCharacterSearch() {
    const subscription = this.searchTermByCharacters
      .pipe(
        filter(term => term.length >= 3), 
        debounceTime(300) 
      )
      .subscribe(term => {
        this.mockDataService.getCharacters(term).subscribe((response:any) => {
          console.log('Characters:', response); 
        });
      });

    this.subscriptions.push(subscription); 
  }

  loadCharactersAndPlanets(): void {
    const subscription = forkJoin([
      this.mockDataService.getCharacters(),  
      this.mockDataService.getPlanets()      
    ]).subscribe(([characters, planets]) => {
      this.planetAndCharactersResults$ = [...characters, ...planets]; 
      console.log('Combined Characters and Planets:', this.planetAndCharactersResults$);
    });

    this.subscriptions.push(subscription); 
  }

  initializeLoadingState(): void {
    const subscription = combineLatest([
      this.mockDataService.getCharactersLoader(), 
      this.mockDataService.getPlanetLoader()      
    ]).subscribe(([charactersLoader, planetsLoader]) => {
      this.isLoading = this.areAllValuesTrue([charactersLoader, planetsLoader]); 
    });

    this.subscriptions.push(subscription); 
  }

  areAllValuesTrue(values: boolean[]): boolean {
    return values.every(v => v === true);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe()); 
  }
}
