import { Component, Input } from '@angular/core';
import { ConfirmationService, Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class AppComponent {
  title = 'ProgramSpec';
  position!: String;
  msgs: Message[] = [];
}
