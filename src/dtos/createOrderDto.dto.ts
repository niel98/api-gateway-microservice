import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateOrderDto {
    @IsNotEmpty()
    productId: any

    @IsNumber()
    @IsNotEmpty()
    amount: number

    @IsNumber()
    @IsNotEmpty()
    qty: number

}