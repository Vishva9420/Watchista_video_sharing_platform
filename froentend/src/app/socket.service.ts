import { Injectable } from '@angular/core';
import {io} from 'socket.io-client'
@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor() { }
  private url ="http://localhost:3000"

  public socket = io("http://localhost:3000");
}
