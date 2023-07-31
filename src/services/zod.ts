import { Injectable } from '@nestjs/common'
import { z } from 'zod'
import { Result } from '@esliph/util-node'
import { ResultException } from '@util/exceptions/result.exception'
import { AppCore } from '../core'
import { ErrorType } from '@@types/error'

@Injectable()
export class ZodValidateService {
    static performParse<ZodSchema extends z.Schema>(data: z.input<ZodSchema>, schema: ZodSchema): Result<z.output<ZodSchema>> {
        try {
            const resParse = schema.parse(data)

            return Result.success<z.output<ZodSchema>>(resParse)
        } catch (err: any) {
            const resultError = ZodValidateService.getPerformError(err)

            AppCore.emit('error', {
                title: resultError.getError().title,
                message: resultError.getError().message,
                causes: resultError.getError().causes,
                description: resultError.getError().description,
                type: ErrorType.ValidateData,
            })

            throw new ResultException(resultError.getError())
        }
    }

    private static getPerformError<ZodSchema extends z.Schema>(err: any) {
        if (err instanceof z.ZodError) {
            return ZodValidateService.getPerformErrorIfInstanceofZodError(err)
        }

        return Result.failure<z.output<ZodSchema>>({ title: 'Data Formatting and Validation', message: 'Invalid data', causes: [{ message: err, origin: 'FormatData' }] })
    }

    private static getPerformErrorIfInstanceofZodError<ZodSchema extends z.Schema>(err: z.ZodError) {
        const dataErrors = err.errors.map(_err => {
            return { message: _err.message, origin: _err.path.join(';') }
        })

        return Result.failure<z.output<ZodSchema>>({ title: 'Data Formatting and Validation', message: 'Invalid data', causes: dataErrors })
    }

    public static defaultSchemaModelTable() {
        const objectDefault = z.object({
            id: z
                .union([z.string(), z.number()])
                .refine(value => !isNaN(Number(value)))
                .transform(value => Number(value))
        })

        return objectDefault
    }
}
