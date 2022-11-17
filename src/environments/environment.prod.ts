import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: true,
  logLevel: NgxLoggerLevel.OFF,
  serverLogLevel: NgxLoggerLevel.ERROR,
  urlAddress: 'https://oilchangetest.azurewebsites.net/api'
};
