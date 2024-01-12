import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { AppService } from './app.service';
import { ParamFetcherPipe } from './pipes/param-fetcher.pipe';
import { Person } from './entities/person.entity';
import { UpdatePersonDto } from './dto/update-person.dto';
import { ApiParam } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  @Get('hello')
  public getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  @SerializeOptions({
    // groups: ['default'],
    groups: ['default', 'advanced'],
    strategy: 'excludeAll',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  public async get(): Promise<Person[]> {
    return await this.personRepository.find();
  }

  @ApiParam({ name: 'id', type: 'string' })
  @Get(':id')
  @SerializeOptions({
    groups: ['default'],
    strategy: 'excludeAll',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  public getOne(
    @Param('id', ParseUUIDPipe, ParamFetcherPipe(Person))
    person: Person,
  ): Person {
    return person;
  }

  @ApiParam({ name: 'id', type: 'string' })
  @Patch(':id')
  @SerializeOptions({
    groups: ['default', 'advanced'],
    strategy: 'excludeAll',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  public async patch(
    @Param('id', ParseUUIDPipe, ParamFetcherPipe(Person))
    person: Person,
    @Body() dto: UpdatePersonDto,
  ): Promise<Person> {
    try {
      const updatedPerson = Object.assign(person, dto);
      const savedPerson: Person = await this.personRepository.save(
        updatedPerson,
      );

      return savedPerson;
    } catch (error: unknown) {
      throw new BadRequestException();
    }
  }
}
