import { EnvironmentConfigType } from './environment-config-type.enum';

export interface EnvironmentConfig {
	production: boolean;
	type: EnvironmentConfigType;
}
