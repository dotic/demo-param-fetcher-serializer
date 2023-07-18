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
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';

import { AppService } from './app.service';
import { ParamFetcherPipe } from './pipes/param-fetcher.pipe';
import { Person } from './entities/person.entity';
import { UpdatePersonDto } from './dto/update-person.dto';
import { ApiParam } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectRepository(Person) private personRepository: Repository<Person>,
  ) {}

  @Get()
  public getHello(): string {
    return this.appService.getHello();
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
    groups: ['default'],
    strategy: 'excludeAll',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  public async patch(
    @Param('id', ParseUUIDPipe, ParamFetcherPipe(Person))
    person: Person,
    @Body()
    dto: UpdatePersonDto,
  ): Promise<Person> {
    try {
      const newData = {
        id: person.id,
        ...instanceToPlain(dto),
      } as DeepPartial<Person>;

      const entity: Person = this.personRepository.create(newData);
      const updatedProperties: DeepPartial<Person> =
        await this.personRepository.save<Person>(entity);

      return new Person({ ...person, ...entity, ...updatedProperties });
    } catch (error: unknown) {
      throw new BadRequestException();
    }
  }
}
