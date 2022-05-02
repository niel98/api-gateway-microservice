import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateOrderDto {
    @IsString()
    @IsNotEmpty()
    id: string

    @IsNotEmpty()
    productId: any

    @IsNumber()
    @IsOptional()
    amount: number

    @IsNumber()
    @IsOptional()
    qty: number

}