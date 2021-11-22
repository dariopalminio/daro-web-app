import { ApiProperty } from '@nestjs/swagger';
import { IServiceResponse } from './service-response.interface';

export class ServiceResponseDTO implements IServiceResponse{
  @ApiProperty()
  readonly isSuccess: boolean;
  @ApiProperty()
  readonly status: number; //HTTP status
  @ApiProperty()
  readonly message: string; 
  @ApiProperty()
  readonly data?: any;
  @ApiProperty()
  readonly error?: any;
}
