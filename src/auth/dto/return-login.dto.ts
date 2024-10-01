import { ReturnUserDto } from "../../user/dto/return-user.dto";

export class ReturnLoginDto {
    user: ReturnUserDto;
    accessToken: string;
}