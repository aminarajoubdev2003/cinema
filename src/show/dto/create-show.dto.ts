import { IsDateString, IsInt, IsNotEmpty, IsNumber } from "class-validator"

export class CreateShowDto {
    @IsNumber()
    @IsInt()
    hall_id:number

    @IsNumber()
    @IsInt()
    movie_id:number
    
    @IsNotEmpty()
    @IsDateString()
    start_time:string

    @IsNotEmpty()
    @IsDateString()
    end_time:string
}
