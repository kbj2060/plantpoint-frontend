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
  conf: ConfigureLogger | undefined;
  constructor( conf?: ConfigureLogger ) {
    this.conf = conf;
  }

  info = <T extends string> (msg: T, component: T) => {
    console.log(`${moment().format('LLLL')} | INFO | ${component} | ${msg}`)
  }

  error = <T extends string> (msg: T, component: T) => {
    console.log(`${moment().format('LLLL')} | ERROR | ${component} | ${msg}`)
  }

  success = <T extends string> (msg: T, component: T) => {
    console.log(`${moment().format('LLLL')} | SUCCESS | ${component} | ${msg}`)
  }
}