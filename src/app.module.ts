import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmCoreModule } from '@nestjs/typeorm/dist/typeorm-core.module';
import { getTypeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [TypeOrmCoreModule.forRootAsync({ useFactory: getTypeOrmConfig })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
