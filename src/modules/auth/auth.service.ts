import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

import { DBCollection } from '@shared/schemas/DBcollection'
import CreateUserDTO from '@modules/user/dto/create-user.dto'
import { UserService } from '@modules/user/user.service'
import { UserAccessInfo } from '@modules/user/dto/interface'
import { User } from '@shared/schemas/user.schema'

@Injectable()
export default class AuthService {
    private tokenSecret: string

    private tokenExpiresIn: string

    private refreshTokenSecret: string

    private refreshTokenExpiresIn: string

    constructor(
        @InjectModel(DBCollection.USER) private UserModel: Model<User>,
        private jwtService: JwtService,
        private configService: ConfigService,
        private userService: UserService
    ) {
        this.tokenSecret = this.configService.get('auth.secret')
        this.tokenExpiresIn = this.configService.get('auth.ttl')
        this.refreshTokenSecret = this.configService.get('auth.refreshSecret')
        this.refreshTokenExpiresIn = this.configService.get('auth.refreshTTL')
    }

    register = async (userInfo: CreateUserDTO) => {
        const salt = await bcrypt.genSaltSync(
            Number(this.configService.get<number>('auth.saltRounds'))
        ) // 盐循环次数

        const hashPwd = await bcrypt.hashSync(userInfo?.password, salt)
        try {
            await new this.UserModel({ ...userInfo, password: hashPwd, salt }).save()
            return true
        } catch (error) {
            throw new BadRequestException(`注册失败:${error}`)
        }
    }

    login = async (userName: string, password: string) => {
        const userInfo = await this.verifyUser(userName, password)
        // Token中需要饱含的值,可包含一切用户标示用户身份的信息，如用户角色，国家等等
        return this.generateToken(userInfo)
    }

    refresh = async (refreshToken: { userName: string; userID: string }) => {
        try {
            const userInfo = await this.UserModel.findOne({ userName: refreshToken?.userName })
            if (userInfo?.userName === refreshToken?.userName) {
                return await this.generateToken(this.tokenPayload(userInfo))
            }
            throw new BadRequestException('用户信息不匹配')
        } catch (error) {
            throw new BadRequestException(`生成token错误:${error}`)
        }
    }

    verifyRefreshToken = async (token: string) => {
        try {
            return await this.jwtService.verifyAsync(token, {
                secret: this.refreshTokenSecret
            })
        } catch (error) {
            throw new BadRequestException(`生成refresh-token错误:${error}`)
        }
    }

    verifyUser = async (userName: string, pwd: string) => {
        try {
            const userInfo = await this.userService.getUserInfo(userName)
            const isPasswordMatch = await bcrypt.compareSync(pwd, userInfo?.password)
            if (!isPasswordMatch || !userInfo) {
                throw new UnauthorizedException('账户名与密码输入有误,请重新输入')
            }
            return this.tokenPayload(userInfo)
        } catch (error) {
            throw new UnauthorizedException(
                `${error?.message ?? '账户名与密码输入有误,请重新输入'}`
            )
        }
    }

    generateToken = async (userAccess: UserAccessInfo) => {
        try {
            const accessToken = await this.jwtService.sign(userAccess, {
                expiresIn: this.tokenExpiresIn,
                secret: this.tokenSecret
            })
            const refreshToken = await this.jwtService.sign(userAccess, {
                expiresIn: this.refreshTokenExpiresIn,
                secret: this.refreshTokenSecret
            })
            return {
                accessToken,
                refreshToken
            }
        } catch (error) {
            throw new BadRequestException(`Token生成出错：${error}`)
        }
    }

    tokenPayload = (userInfo: Record<string, any>) => {
        return {
            userName: userInfo?.userName ?? '',
            userID: userInfo?.id ?? '',
            roles: userInfo?.roles ?? []
        }
    }
}
