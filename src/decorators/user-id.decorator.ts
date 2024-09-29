import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { authorizationToLoginPayload } from "src/utils/base-64-converter";

export const UserId = createParamDecorator((_, ctx: ExecutionContext) =>{
    const { authorization } = ctx.switchToHttp().getRequest().headers;

    const loginPayLoad = authorizationToLoginPayload(authorization);

    console.log('authorization',authorization);
    return loginPayLoad?.id;
});