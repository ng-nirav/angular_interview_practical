# ValorxScreening

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Explain how change detection strategies impact performance and when to use each strategy.

Change Detection in Angular is process of updating the view when the data model changes, to keep the chages sync to the view. Angular has 2 type of CD strategies 
- for change detection it uses zone.js library to update the UI when async operation completes by calling change detection

1. Default Change detection

- I Have used in parent Component
- It will invoke changes every time when there are any chnges in application
- Frequently checks for the changes
- For Large application it can lead to performance issues, as it will go for check on every time there are any chnges in application
- use for small scale application

2. OnPush Change Detection

- I have used in Child Component
- It will invoke changes when
  1. Using Change detection manually invoke changes
  2. any event triggered on the view which will update
  3. The Refence value of non-primitive data change, for promitive it will invoke everytime there is change in value
- Ideal for the Large scale application, so there will be less change detection cycle
- Improve overall application performance

## Write the benefits and use cases of hierarchical dependency injection in Angular.

- DI in Angular is design pattern which used to provide instance of dependencies like services to class who inject them.

# benefits

1. Reusability of code
2. Centralized,Module and component level state management
3. Well organized code

# Type of hierarchical Dependency injection

1. Root level (Singleton service)

- It will create single instace of service,use it throughout application
- global state
- we can set this by passing - providedIn: 'root' in service in @Injectable decorator
- For parent componet and Wrapper component used root level service

2. Module Level

- We can set the scope to Module when we pass it to the providers array , so it wil be availble to that Module component's,
- State will be limite to the Module component only
- we can set this by Passing in @NgModule decorater, providers array list

3. Component Level

- We can limit the instance of service to the component and it's child componen so the state will be only spercific to this component
- WE can set this by passing on @component Decorator ,providers array
- For child Component user component level service 