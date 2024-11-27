import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  root = "https://7wygl76pj7.execute-api.us-east-1.amazonaws.com/dev"

  constructor() { }
}
