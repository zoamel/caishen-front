# [Abandoned] Caishen

## Demo

[https://caishen-96605.firebaseapp.com](https://caishen-96605.firebaseapp.com)

## About

The idea for this project was to create a personal budgeting application based on a home budget spreadsheet by Michał Szafrański.

For me, spreadsheets are not easy to use, don't look good and can't be used easily on smartphones. Because of that, I've decided to create a web app based on the principles of this spreadsheet, but with better UI.

Unfortunately, due to lack of time after work, and focusing more on other non-angular projects I am putting this application for public availability and abandoning any work on it in the near future.

I am well aware that there are some bugs and a lot of missing features, will put them as issues in case someone wants to make a Pull Request.  

## Technical stuff

This project was generated with [Angular CLI](https://github.com/angular/angular-cli)

### Tools Used

- For database I have used `Google Firestore`
- For authentication I have used `Google Firebase` with anonymous auth due to RODO
- For styling I have used `Angular Material` with `Covalent Teradata`
- For i18n I have used `ngx-translate`. Currently only polish language is handled

### Installing dependencies

*Important*: Please provide your firebase project credentials in `environment` files

Run `npn install`

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
