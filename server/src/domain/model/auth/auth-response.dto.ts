import { ApiProperty } from '@nestjs/swagger';
import { IAuthResponse } from './auth-response.interface';

export class AuthResponseDTO implements IAuthResponse{
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
