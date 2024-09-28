import { ReturnUserDto } from "src/user/dto/return-user.dto";

export class ReturnLoginDto {
    user: ReturnUserDto;
    accessToken: string;
}