import { IsIn, IsNotEmpty } from 'class-validator'

export class OrderByDto<T> {
  @IsNotEmpty()
  field: T

  @IsIn(['asc', 'desc'])
  @IsNotEmpty()
  order: 'asc' | 'desc'
}
