import { Component } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'amplify-ng-app';

  constructor(public amplify: AmplifyService) {
    amplify.auth().urrentAuthenticatedUser().then(console.log);
  }

}
