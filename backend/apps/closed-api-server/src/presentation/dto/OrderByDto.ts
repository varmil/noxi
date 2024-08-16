import { Type } from 'class-transformer'
import {
  ArrayNotEmpty,
  IsArray,
  IsIn,
  IsNotEmpty,
  ValidateNested
} from 'class-validator'

export class OrderBysDto<T extends string> {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderByDto<T>)
  orderBy: OrderByDto<T>[]

  toOrderBy = () => {
    console.log('orderBy', this.orderBy)
    return this.orderBy.map(({ field, order }) => ({
      [field]: order
    })) as Record<T, 'asc' | 'desc'>[]
  }
}

export class OrderByDto<T> {
  @IsNotEmpty()
  field: T

  @IsIn(['asc', 'desc'])
  @IsNotEmpty()
  order: 'asc' | 'desc'
}
