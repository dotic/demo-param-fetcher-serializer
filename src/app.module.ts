import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';

@Module({
  controllers: [AppController],
  imports: [
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
      database: 'postgres',
      entities: [Person],
      host: 'localhost',
      password: 'postgres',
      port: 5432,
      type: 'postgres',
      username: 'postgres',
    }),
    TypeOrmModule.forFeature([Person]),
  ],
  providers: [AppService, Repository],
})
export class AppModule {}
