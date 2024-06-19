import { Body, Controller, Post } from '@nestjs/common'

import CreateUserDTO from '@modules/user/dto/create-user.dto'
import NoToken from '@shared/decorators/noToken.decorator'

import AuthService from './auth.service'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @NoToken()
    @Post('/register')
    register(@Body() userInfo: CreateUserDTO) {
        return this.authService.register(userInfo)
    }

    @NoToken()
    @Post('/login')
    async login(@Body() userInfo: { userName: string; password: string }) {
        return this.authService.login(userInfo?.userName, userInfo?.password)
    }

    @NoToken()
    @Post('/refresh')
    async refresh(@Body() body: { refreshToken: string }) {
        const tokenInfo = await this.authService.verifyRefreshToken(body?.refreshToken)
        return this.authService.refresh(tokenInfo)
    }
}
