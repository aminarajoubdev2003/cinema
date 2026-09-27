
import { IsEmail , IsNumber, IsPositive } from 'class-validator';


export class UpdateDepositDto  {
    @IsEmail()
    email:string
    
    @IsNumber() 
    @IsPositive()
    amount:number
}
