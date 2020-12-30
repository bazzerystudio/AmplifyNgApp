# AmplifyNgApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## AWS Amplify 

### Changes to Angular CLI project
The Angular CLI requires some changes in order to use AWS Amplify. Come back to this section to troubleshoot any issues.
Add type definitions for Node.js by changing src/tsconfig.app.json. This is a requirement for aws-sdk-js.

```
{
  "compilerOptions": {
    "types": ["node"]
  },
}
```

Add the following code, to the top of src/polyfills.ts. This is a requirement for Angular 6+.


```
declare global {
  interface Window { global: any; }
}
window.global = window;
```

### Installing the AWS Amplify dependencies
Install the required dependencies for AWS Amplify and Angular using:

`npm install --save aws-amplify aws-amplify-angular`

### Installing the Amplify CLI
In case you don’t already have it, install the Amplify CLI:

`npm install -g @aws-amplify/cli`

**Now we need to configure the Amplify CLI with your credentials:**

> If you’d like to see a video walkthrough of this configuration process, click here. Alternatively follow the steps below.
> 
> <https://www.youtube.com/watch?v=fWbM5DLh25U>
> 

Once you've signed in to the **AWS Console**, continue:

* Specify the AWS Region: pick-your-region
* Specify the username of the new IAM user: amplify-app

> To view the new created IAM User go to the dashboard at 
>
> https://console.aws.amazon.com/iam/home#/users. 
>
> Also be sure that your region matches your selection.

### Setting up your Amplify environment
**AWS Amplify** allows you to create different environments to define your preferences and settings. For any new project you need to run the command below and answer as follows:

```
amplify init
```

* Enter a name for the project: **amplify-app**
* Enter a name for the environment: **dev**
* Choose your default editor: **Visual Studio Code**
* Please choose the type of app that you’re building **javascript**
* What javascript framework are you using **angular**
* Source Directory Path: **src**
* Distribution Directory Path: **dist/amplify-app**
* Build Command: **npm run-script build**
* Start Command: **ng serve**
* Do you want to use an AWS profile? **Yes**
* Please choose the profile you want to use **default**

At this point, the **Amplify CLI** has initialised a new project and a new folder: **amplify**. 
The files in this folder hold your project configuration.

```
<amplify-app>
    |_ amplify
      |_ .config
      |_ #current-cloud-backend
      |_ backend
      team-provider-info.json
```

### Adding authentication
**AWS Amplify** provides authentication via the auth category which gives us access to **AWS Cognito**. To add authentication use the following command:
`
amplify add auth
`

When prompted choose:

* Do you want to use default authentication and security configuration?: **_Default configuration_**
* How do you want users to be able to sign in when using your Cognito User Pool?: **_Username_**
* What attributes are required for signing up? (Press to select, to toggle all, to invert selection): **_Email_**

### Pushing changes to the cloud
By running the push command, the cloud resources will be provisioned and created in your **AWS account**.

```
amplify push
```

To quickly check your newly created **Cognito User Pool** you can run
```
amplify status
```

> To access the AWS Cognito Console at any time, go to the dashboard at 
>
> https://console.aws.amazon.com/cognito. 
>
> Also be sure that your region is set correctly.

Your resources have been created and you can start using them!

### Configuring the Angular application
Reference the auto-generated `aws-exports.js` file that is now in your `src` folder. 

To configure the app, open `main.ts` and add the following code below the last import:

```
import Amplify from 'aws-amplify';
import amplify from './aws-exports';
Amplify.configure(amplify);
```

### Importing the Angular module
Add the Amplify module and service to `src/app/app.module.ts`:

```
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
@NgModule({
  imports: [
    AmplifyAngularModule
  ],
  providers: [
    AmplifyService
  ]
});
```
At this point, your application is ready.

### Using Amplify Service
The `AmplifyService` provides access to **AWS Amplify** core categories via dependency injection: _auth_, _analytics_, _storage_, _api_, _cache_, _pubsub_; and authentication state via **observables**.

### Using the Authenticator Component
**AWS Amplify** provides **UI components** that you can use in your app. Let’s add these components to the project
```
npm i --save @aws-amplify/ui
```
Also include these imports to the top of `styles.css`
```
@import "~@aws-amplify/ui/src/Theme.css";
@import "~@aws-amplify/ui/src/Angular.css";
```

In order to use the **authenticator component** add it to `src/app.component.html`:

```
<amplify-authenticator></amplify-authenticator>
```
You can run the app and see that an **authentication flow** has been added in front of your **app component**. 

This flow gives users the ability to sign up and sign in.


> To view any users that were created, go back to the Cognito Dashboard at 
> https://console.aws.amazon.com/cognito. 
> Also be sure that your region is set correctly.

Alternatively you can also use:
```
amplify console auth
```

### Accessing User Data
To access the user’s info once they are signed in call `currentAuthenticatedUser()`. 

This will return a **_promise_**.

```
import { AmplifyService } from 'aws-amplify-angular';
@Component(...)
export class AppComponent {
  constructor(public amplify: AmplifyService) {
    amplify.auth().currentAuthenticatedUser().then(console.log)
  }
}
```
