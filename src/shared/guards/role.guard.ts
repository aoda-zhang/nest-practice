import { CanActivate, ExecutionContext } from '@nestjs/common'
import { Observable } from 'rxjs'
import { Request } from 'express'
// simple guard template
export class RoleGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        // get role from http header
        const role = context.switchToHttp()?.getRequest<Request>()?.headers
        return role?.role === 'admin'
    }
}
