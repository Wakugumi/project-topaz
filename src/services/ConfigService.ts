import config from './config.json';

type ConfigEntry = {
	name: string;
	value: string | number | boolean;
};

type Config = {
	[key: string]: ConfigEntry;
};

class ConfigService {
	private config: Config | null = null;

	async loadConfig(): Promise<void> {
		if (!this.config) {
			this.config = config;
		}
	}

	getValue(key: string): string | number | boolean | null {
		if (!this.config || !this.config[key]) {
			console.warn(`Key "${key}" not found in configuration.`);
			return null;
		}
		return this.config[key].value;
	}

	getName(key: string): string | null {
		if (!this.config || !this.config[key]) {
			console.warn(`Key "${key}" not found in configuration.`);
			return null;
		}
		return this.config[key].name;
	}

	setValue(key: string, newValue: string | number | boolean): void {
		if (!this.config || !this.config[key]) {
			console.warn(`Key "${key}" not found in configuration.`);
			return;
		}
		this.config[key].value = newValue;
	}

	getAllConfig(): ConfigEntry[] {
		if (!this.config) {
			console.warn('Configuration not loaded.');
			return [];
		}
		return Object.keys(this.config).map((key) => ({
			name: this.config![key].name,
			value: this.config![key].value,
		}));
	}
}

const globalConfigService = new ConfigService();

export default globalConfigService;

