import moment from "moment";

export class ConfigureLogger {
  fileWrite:boolean | undefined; retention: string | undefined; compression: string | undefined; filepath: string | undefined;
  constructor(fileWrite?: boolean, filepath?: string, retention?: string, compression?: string ) {
    this.fileWrite = fileWrite;
    this.retention = retention;
    this.compression = compression;
    this.filepath = filepath;
  }
}

export class CustomLogger {
  conf: ConfigureLogger | undefined; component: string | undefined;
  constructor( conf?: ConfigureLogger, component?: string ) {
    this.component = component || 'undefined';
    this.conf = conf;
  }

  set_component = <T extends string> (component: T) => {
    this.component = component
  }

  info = <T extends string> (msg: T) => {
    console.log(`${moment().format('LLLL')} | INFO | ${this.component} | ${msg}`)
  }

  error = <T extends string> (msg: T) => {
    console.log(`${moment().format('LLLL')} | ERROR | ${this.component} | ${msg}`)
  }

  success = <T extends string> (msg: T) => {
    console.log(`${moment().format('LLLL')} | SUCCESS | ${this.component} | ${msg}`)
  }
}