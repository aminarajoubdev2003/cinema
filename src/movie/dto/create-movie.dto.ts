import { IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateMovieDto {
    @IsString()
    @IsNotEmpty()
    @Matches(/^[\u0600-\u06FF\s]+$/,{
        message:'العنوان يجب أن يحتوي على أحرف عربية فقط'
    })
    title:string
}
