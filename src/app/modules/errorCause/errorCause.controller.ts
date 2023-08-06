import { Controller, Get, Post, Delete, Put, UseGuards } from '@nestjs/common'
import { Body, Res, Param } from '@nestjs/common/decorators'
import { Response } from '@@types/http'
import { ErrorCauseService } from '@modules/errorCause/errorCause.service'

@Controller('/errorCauses')
export class ErrorCauseController {
    constructor(private readonly errorCauseService: ErrorCauseService) {}

    
}
