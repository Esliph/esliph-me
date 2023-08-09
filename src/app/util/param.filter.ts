import { z } from 'zod'

export enum GlobalParamFilter {
    EXCLUDE = 'exclude'
}

export const GlobalParamFilterSChema = z.object({
    exclude: z.string().trim().optional().default('')
})
