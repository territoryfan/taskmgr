import { NgModule } from '@angular/core';
import { AuthService } from './auth.service';
import { ProjectService } from './project.service';
import { QuoteService } from './quote.service';
import { TodoService } from './todo.service';
import { AuthGuardService } from './auth-guard.service'

export  {
  AuthGuardService,
  AuthService,
  ProjectService,
  QuoteService,
  TodoService
}

@NgModule({})
export class ServicesModule {
  static forRoot(){
    return {
      ngModule: ServicesModule,
      providers: [
        AuthGuardService, 
        AuthService, 
        ProjectService, 
        QuoteService, 
        TodoService
      ]
    }
  }
}