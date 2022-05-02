import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {

    @IsNumber()
    @IsNotEmpty()
    id: number
    
    @IsString()
    @IsOptional()
    name: string

    @IsString()
    @IsOptional()
    description: string

    @IsString()
    @IsOptional()
    image: string

    @IsString()
    @IsNotEmpty()
    price: number
}