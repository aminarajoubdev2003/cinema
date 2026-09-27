import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateBookingDto {
    
    @IsNumber()
    @IsInt()
    show_id:number

    @IsNumber()
    @IsInt()
    seat_id:number

}
