import { IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateHallDto {
    @IsString()
    @IsNotEmpty()
    @Matches(/^[\u0600-\u06FF\s]+$/,{
        message:'اسم القاعة يجب أن يحتوي على أحرف عربية فقط'
    })
    name:string
}
