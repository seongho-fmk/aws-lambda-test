"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypeOrmConfig = void 0;
const client_secrets_manager_1 = require("@aws-sdk/client-secrets-manager");
const credential_providers_1 = require("@aws-sdk/credential-providers");
const getCredentialFromSecretManager = async () => {
    const client = new client_secrets_manager_1.SecretsManagerClient({
        credentials: (0, credential_providers_1.fromIni)({ profile: 'local' }),
    });
    const output = await client.send(new client_secrets_manager_1.GetSecretValueCommand({
        SecretId: `${process.env.NODE_ENV || 'dev'}/olympus/postgres`,
    }));
    const { username, password, host, port, dbClusterIdentifier } = JSON.parse(output.SecretString || '');
    return {
        host,
        username,
        password,
        port,
        database: dbClusterIdentifier,
    };
};
const getTypeOrmConfig = async () => {
    const { host, username, password, database, port } = await getCredentialFromSecretManager();
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
exports.getTypeOrmConfig = getTypeOrmConfig;
//# sourceMappingURL=typeorm.config.js.map