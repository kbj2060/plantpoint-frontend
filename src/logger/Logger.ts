import {ConfigureLogger, CustomLogger} from '@interfaces/Logger.class';

const conf: ConfigureLogger = new ConfigureLogger()
export const customLogger = new CustomLogger(conf);