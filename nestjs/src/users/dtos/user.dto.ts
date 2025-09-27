import { IsString, IsEmail, MinLength, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateProfileDto, UpdateProfileDto } from './profile.dto';

export class CreateUserDto {//this class is used to validate the data, not need regex
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ValidateNested() //check rules of CreateProfileDto
  @Type(() => CreateProfileDto) //extends from CreateProfileDto
  @IsNotEmpty()
  profile: CreateProfileDto;
}

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ["profile"])) {// get all rules from CreateUserDto except profile and make them optional
  //profile is optional and validate with UpdateProfileDto rules
  @ValidateNested()
  @Type(() => UpdateProfileDto)
  @IsOptional()
  profile: UpdateProfileDto;
}