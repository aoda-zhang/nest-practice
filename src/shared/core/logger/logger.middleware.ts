import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    // eslint-disable-next-line class-methods-use-this
    use(req: Request, res: Response, next: NextFunction) {
        const traceId = uuidv4()
        req.headers.traceID = traceId
        next()
    }
}
