import { NextFunction, Request, Response } from 'express';

export class ErrorHandler extends Error {

    status: number;
    name: string;
    message: string;
    callStack!: string;

    constructor(status: number, err: Error) {
        super();
        this.status = status;
        this.name = err.name;
        this.message = err.message;
        if (err.stack){
            this.callStack = err.stack;
        }
    }

    public static handleError(err: any, res: Response) {
        console.log('handleError() =>  ', err);
        const { statusCode, message } = err;
        res.status(statusCode).json({
          status: "error",
          statusCode,
          message
        });
    };

    // public static getInstance(): ErrorHandler {

    //     if (!ErrorHandler.instance) {
    //         ErrorHandler.instance = new ErrorHandler(0,new Error());
    //     }

    //     return ErrorHandler.instance;
    // }

}

