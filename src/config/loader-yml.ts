import * as yaml from 'js-yaml';
import { join } from 'path';
import { readFileSync } from 'fs';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { ConfigDto } from './dto/config.dto';

function validate(config: Record<string, unknown>): ConfigDto {
  const validatedConfig = plainToInstance(ConfigDto, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}

export default function () {
  const environment = process.env.APP_ENV || 'development';
  const path = 'src/config';

  const fileContent = readFileSync(
    join(process.cwd(), path, `${environment}.yml`),
    'utf8',
  );

  const ymlConfig = yaml.load(fileContent) as Record<string, any>;

  return validate(ymlConfig);
}
