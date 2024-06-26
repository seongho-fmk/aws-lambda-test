"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const middleware_1 = require("aws-serverless-express/middleware");
const aws_serverless_express_1 = require("aws-serverless-express");
const express_1 = __importDefault(require("express"));
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const app_module_1 = require("./app.module");
const binaryMimeTypes = [];
let cachedServer;
const bootstrapServer = async () => {
    if (!cachedServer) {
        const expressApp = (0, express_1.default)();
        const nest = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressApp));
        nest.use((0, middleware_1.eventContext)());
        await nest.init();
        cachedServer = (0, aws_serverless_express_1.createServer)(expressApp, undefined, binaryMimeTypes);
    }
    return cachedServer;
};
const handler = async (event, context) => {
    cachedServer = await bootstrapServer();
    return (0, aws_serverless_express_1.proxy)(cachedServer, event, context, 'PROMISE').promise;
};
exports.handler = handler;
//# sourceMappingURL=lambda.js.map