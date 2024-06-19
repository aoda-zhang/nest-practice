import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { ConfigService } from '@nestjs/config'

import getTokenFromHeader from '@shared/utils/overWriteHeader'
import { HttpReqHeader } from '@shared/core/http/interface'

@Injectable()
export class ApiSettingMiddleware implements NestMiddleware {
    constructor(private readonly configService: ConfigService) {}

    // eslint-disable-next-line class-methods-use-this
    use(req: Request, res: Response, next: NextFunction) {
        const token = getTokenFromHeader(req)
        // 将 Bearer Token 重新命名为 "access-token"
        req.headers[HttpReqHeader.accessToken] = token
        next()
    }
}
