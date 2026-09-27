import { IsEmail, IsInt, IsNumber } from "class-validator";


export class PayBookingDto  {
    
    @IsNumber()
    @IsInt()
    booking_id:number
}
