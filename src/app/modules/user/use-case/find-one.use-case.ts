import { Injectable } from '@nestjs/common'
import { Result } from '@esliph/util-node'
import { z } from 'zod'
import { UseCase } from '@common/use-case'
import { ZodValidateService } from '@services/zod'
import { UserFindUniqueRepositoryAbstract } from '@modules/user/repository/find.repository'
import { UserPropSelect } from '@modules/user/repository/repository'

export class UserFindOneUseCaseDTO { }

export const UserFindOneUseCaseArgsSchema = ZodValidateService.defaultSchemaModelTable()

const UserPropsSelected = {
    id: true,
    username: true,
    name: true,
    online: true,
    createAt: true
}

export type UserFindOneUseCaseArgs = z.input<typeof UserFindOneUseCaseArgsSchema>
export type UserFindOneUseCaseResponse = z.output<typeof UserFindOneUseCaseArgsSchema>
export type UserFindOneUseCasePerformResponseValue = { user: UserPropSelect<{ select: typeof UserPropsSelected }> }
export type UserFindOneUseCasePerformResponse = Promise<Result<UserFindOneUseCasePerformResponseValue>>

@Injectable()
export class UserFindOneUseCase extends UseCase {
    constructor(private readonly findUserRepository: UserFindUniqueRepositoryAbstract) {
        super()
    }

    async perform(findArgs: UserFindOneUseCaseArgs): UserFindOneUseCasePerformResponse {
        try {
            const responsePerform = await this.performFindOne(findArgs)

            return responsePerform
        } catch (err: any) {
            return this.extractError(err, { title: 'Find User', message: 'Cannot find user' })
        }
    }

    private async performFindOne(findArgs: UserFindOneUseCaseArgs): UserFindOneUseCasePerformResponse {
        const findArgsValidationResult = this.validateArgsProps(findArgs)

        const findArgsDTO = findArgsValidationResult.getValue()

        const performFindRepositoryResult = await this.performFindRepository(findArgsDTO)

        if (!performFindRepositoryResult.isSuccess()) {
            return Result.failure(performFindRepositoryResult.getError(), performFindRepositoryResult.getStatus())
        }

        return Result.success<UserFindOneUseCasePerformResponseValue>(performFindRepositoryResult.getValue(), performFindRepositoryResult.getStatus())
    }

    private validateArgsProps(findArgs: UserFindOneUseCaseArgs) {
        const userFindDTO = ZodValidateService.performParse(findArgs, UserFindOneUseCaseArgsSchema)

        return userFindDTO
    }

    private async performFindRepository(findArgs: UserFindOneUseCaseResponse) {
        const response = await this.findUserRepository.perform({ where: { id: findArgs.id }, select: UserPropsSelected })

        return response
    }
}
/*

Invalid `.findFirst()` invocation in
C:\Users\danrs\OneDrive\Documentos\Work\Esliph\me\dist\app\modules\error\repository\repository.js:91:18

  88 async findUnique(args) {
  89     try {
  90         const response = await this.repository.error
→ 91             .findFirst({
                   where: {
                     id: 0
                   },
                   select: {
                 ?   id?: true,
                 ?   type?: true,
                 ?   title?: true,
                 ?   message?: true,
                 ?   description?: true,
                 ?   stack?: true,
                 ?   createAt?: true,
                 ?   updateAt?: true,
                 ?   causes?: true,
                 ?   _count?: true
                   }
                 })

The `select` statement for type Error must not be empty. Available options are listed in green.
*/
