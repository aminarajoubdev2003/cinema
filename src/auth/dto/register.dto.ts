
import { IsEmail , IsNotEmpty, IsString, Matches, MinLength,  } from "class-validator"

export class RegisterDto {

    @IsNotEmpty()
    @IsString()
    @Matches(/^[\u0600-\u06FF\s]+$/,{
        message:'اسم المؤلف يجب  أن يحتوي على أحرف عربية فقط'
    })
    name:string

    @IsEmail()
    email:string

    @MinLength(8)
    password:string
}
