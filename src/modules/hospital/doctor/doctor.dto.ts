// dto层用来验证数据
// class-validator用来验证数据
import { IsNotEmpty } from "class-validator";
// class-transformer用来转换数据
import { Transform } from "class-transformer";

export class UserDto {
  @IsNotEmpty({ message: "用户名是必填的" })
  @Transform((user) => user.value.trim())
  username: string;

  // @IsNotEmpty({ message: "手机号是必填的" })
  // @IsMobilePhone("zh-CN", {}, { message: "手机号格式不正确" })
  phone?: string;

  password: string;

  roles: string[] | number[] | null | undefined;
}

export class DoctorDto {
  user: UserDto;

  introduction?: string;

  registration_fee?: number;
}
