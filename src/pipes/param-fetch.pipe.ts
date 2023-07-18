import {
  ArgumentMetadata,
  Inject,
  Injectable,
  mixin,
  NotFoundException,
  PipeTransform,
  Type,
} from '@nestjs/common';
import { FindOptionsWhere } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ModuleRef } from '@nestjs/core';

export function ParamFetchPipe<T>(
  entityType: Type<T>,
): Type<PipeTransform<string, Promise<T>>> {
  @Injectable()
  class MixinIdentifierEntityByUuidPipe
    implements PipeTransform<string, Promise<T>>
  {
    // ModuleRef is used to get services that are already injected.
    public constructor(
      @Inject(ModuleRef) private readonly moduleRef: ModuleRef,
    ) {}

    public async transform(
      id: string,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      metadata: ArgumentMetadata,
    ): Promise<any> {
      const repository = this.moduleRef.get(getRepositoryToken(entityType), {
        strict: false,
      });

      try {
        console.log(repository);
        return await repository.findOneOrFail({
          where: { id: id } as FindOptionsWhere<Type<T>>,
        });
      } catch (error: unknown) {
        throw new NotFoundException();
      }
    }
  }

  return mixin(MixinIdentifierEntityByUuidPipe);
}
