import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from '@aws-sdk/client-secrets-manager';
import { fromIni } from '@aws-sdk/credential-providers';

interface Credential {
  host: string;
  username: string;
  password: string;
  port: string;
  database: string;
}

const getCredentialFromSecretManager = async (): Promise<Credential> => {
  const client = new SecretsManagerClient({
    credentials: fromIni({ profile: 'local' }),
  });
  const output = await client.send(
    new GetSecretValueCommand({
      SecretId: `${process.env.NODE_ENV || 'dev'}/olympus/postgres`,
    }),
  );
  const { username, password, host, port, dbClusterIdentifier } = JSON.parse(
    output.SecretString || '',
  );
  return {
    host,
    username,
    password,
    port,
    database: dbClusterIdentifier,
  };
};

export const getTypeOrmConfig = async (): Promise<TypeOrmModuleOptions> => {
  const { host, username, password, database, port } =
    await getCredentialFromSecretManager();
  return {
    type: 'postgres',
    host,
    port: parseInt(port),
    username,
    password,
    database,
    entities: ['dis/src/**/*.entity{.ts,.js}'],
    synchronize: false,
  };
};
