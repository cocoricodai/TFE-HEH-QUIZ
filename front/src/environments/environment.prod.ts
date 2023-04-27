import { EnvironmentConfigType } from './models/environment-config-type.enum';
import { EnvironmentConfig } from './models/environment-config.interface';

export const environment: EnvironmentConfig = {
	production: true,
	type: EnvironmentConfigType.Production,
};
