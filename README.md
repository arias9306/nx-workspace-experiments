# NxWorkspaceExperiments

## Create workspace

In order to create the nx workspace we need to run the following command

```
npx create-nx-workspace@latest
```

After run this command we need to set the following params

```
? Workspace name (e.g., org name)       : nx-workspace-experiments
? What to create in the new workspace   : empty
? CLI to power the Nx Workspace         : Nx
? Use Nx Cloud?                         : No
```

## Configure commitlint, conventionalCommits and husky

Install [commitlint](https://github.com/conventional-changelog/commitlint) and user the configuration with [conventional commits](https://www.conventionalcommits.org/en/)

```
npm install --save-dev @commitlint/config-conventional @commitlint/cli
```

Add the commitlint config file

```
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```

Add the rules for commitlint in the `commitlint.config.js`

```
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-empty': [2, 'never'],
    'subject-max-length': [2, 'always', 200],
    'subject-min-length': [2, 'always', 10],
    'body-min-length': [2, 'always', 10],
    'scope-enum': [2, 'always', ['auth']],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'style',
        'test',
      ],
    ],
  },
};

```

Install [husky](https://github.com/typicode/husky)

```
npm install husky --save-dev
```

Add `husky` to the `package.json` file with the following configuration:

- **pre-commit**: we run the `nx format:write` command in order to format all the code before every commit and then we run the `nx affected:lint` to run the lint only for the affected code and at the end we run the `nx affected:test` command to run the test for the affected code.
- **commit-msg**: we run the commilint to be sure that the commit message meets with the configuration.

```
{
  ...
  "husky": {
    "hooks": {
      "pre-commit": "nx format:write && nx affected:lint && nx affected:test",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```

### Types allowed in the commitlint

Must be one of the following:

- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to our CI configuration files and scripts
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests

#### Examples of commits

```
git commit -m 'docs: update readme.md'
```

or

```
git commit -m 'feat(auth): add the auth.controller'
```

## Add the Angular and Nest pluging

To add Angular and Nest we need to run the followings commands

```
npm install --save-dev @nrwl/angular
```

and

```
npm install --save-dev @nrwl/nest
```

## Add an Angular and Nest App

In order to generate a Nest App we need to run the following command

```
nx generate @nrwl/nest:application --name=api
```

now we add the Angular App

```
nx generate @nrwl/angular:application --name=front --style=scss --backendProject=api --linter=eslint --routing --strict
```

## Adding a ui library

Now we are going to create a angular library for the UI components

```
nx generate @nrwl/angular:library --name=ui --style=scss --directory=front --linter=eslint
```

after that we create a profile component inside of ui

```
nx generate @schematics/angular:component --name=profile --project=front-ui --style=scss --changeDetection=OnPush --export
```

now in order to import the `profile.component.ts` in our `front` app, we need to import the `FrontUiModule` in the `app.module.ts`

```typescript
...
import { FrontUiModule } from '@nx-workspace-experiments/front/ui';

@NgModule({
  ...
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    HttpClientModule,
    FrontUiModule
  ],
  ...
})
export class AppModule {}
```

### Adding Angular Material Lib

We are going to create a library to import and export all the Angular Material components and shared in our apps.

```
nx generate @nrwl/angular:library --name=material --style=scss --directory=front --linter=eslint
```

### Adding a data-models lib

This library is used to shared interfaces between our apps.

```
nx generate @nrwl/workspace:library --name=data-models
```

## Firebase

We are going to create a firebase account to use `Cloud Firestore` to save our data and then also use `Hosting` to publish our app.

first we need to install the firebase CLI

```
npm i -g firebase-tools
```

After that we need to login running the following command

```
firebase login
```

And then now we are going to add `@angular/fire` and `firebase` packages in our monorepo

```
npm i @angular/fire firebase --save
```

> NOTE: I will skip the firebase part, but basicaly in firebase we created a new project and also created a `colection` in the Cloud Firestore

### Add the firebase config

Now we need to add the firebase config into the `enviroment.ts` and `enviroment.prod.ts` in the `front` project

```typescript
 ...
  firebaseConfig: {
    apiKey: '<your-api-key>',
    authDomain: '*****',
    databaseURL: '*****',
    projectId: '*****',
    storageBucket: '*****',
    messagingSenderId: '*****',
    appId: '*****',
    measurementId: '*****',
  }
 ...
```

You can find the configuration info in the firebase console configuration.