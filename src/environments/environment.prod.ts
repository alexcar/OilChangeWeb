import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: true,
  logLevel: NgxLoggerLevel.OFF,
  serverLogLevel: NgxLoggerLevel.ERROR,
  urlAddress: 'https://oilchangetest.azurewebsites.net/api',
  userUpdate: "2bdf4dce-b412-48fd-84ff-d3fe32a057af"
};
