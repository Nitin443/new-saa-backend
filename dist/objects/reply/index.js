"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCodes = exports.FieldErrors = exports.FieldError = exports.CallbackReply = void 0;
class CallbackReply {
    constructor() {
        this.Errors = [];
        this.Info = [];
        this.Data = [];
        this.ErrorCode = '';
        this.fieldErrors = new FieldErrors();
    }
    AddFieldError(FieldName, Error) {
        this.ErrorCode = 'ERROR';
        this.fieldErrors.Add(FieldName, Error);
    }
    merge(reply) {
        this.Errors = this.Errors.concat(reply.Errors);
        this.Info = this.Info.concat(reply.Info);
        this.Data = this.Data.concat(reply.Data);
        this.ErrorCode = reply.ErrorCode;
        this.fieldErrors.merge(reply.fieldErrors);
    }
    Proceed() {
        if (this.Errors.length === 0 && this.fieldErrors.List.length === 0) {
            return true;
        }
        return false;
    }
    mergeErrors(reply) {
        this.Errors = this.Errors.concat(reply.Errors);
        this.Info = this.Info.concat(reply.Info);
        this.setErrorCode();
    }
    AddErrors(errors) {
        this.ErrorCode = 'ERROR';
        if (errors instanceof Array) {
            errors.forEach((err) => {
                if (err instanceof CallbackReply) {
                    err.fieldErrors.List.forEach((fe) => {
                        fe.Errors.forEach((er2) => {
                            this.AddFieldError(fe.FieldName, er2);
                        });
                    });
                    this.Errors = this.Errors.concat(err.Errors);
                }
                if (typeof err === 'string') {
                    this.Errors.push(err);
                }
            });
            return;
        }
        this.Errors = this.Errors.concat(errors);
    }
    setErrorCode() {
        if (this.Proceed()) {
            this.ErrorCode = 'SUCCESS';
        }
        else {
            this.ErrorCode = 'ERROR';
        }
    }
    AddJOIErrors(result) {
        if (result.error === undefined) {
            return;
        }
        this.ErrorCode = exports.ErrorCodes.ERROR;
        this.Errors = result.error.details.map((e) => {
            return e.message + " | " + e.path + " | " + e.type;
        });
    }
}
exports.CallbackReply = CallbackReply;
class FieldError {
    constructor() {
        this.FieldName = '';
        this.Errors = new Array();
    }
}
exports.FieldError = FieldError;
class FieldErrors {
    constructor() {
        this.List = new Array();
    }
    Add(FieldName, Error) {
        let found = false;
        //Check if field already exists within Array
        this.List.forEach((FE, n) => {
            if (FE.FieldName === FieldName) {
                found = true;
                //Means it contains Field names then add error
                this.List[n].Errors.push(Error);
            }
        });
        if (!found) {
            //If there is no field name which is matched then add new FieldError
            let FE = new FieldError();
            FE.FieldName = FieldName;
            FE.Errors.push(Error);
            this.List.push(FE); //Added field error to collection
        }
    }
    merge(Input) {
        Input.List.forEach((FE) => {
            FE.Errors.forEach((E) => {
                this.Add(FE.FieldName, E);
            });
        });
    }
}
exports.FieldErrors = FieldErrors;
/**
 * Error codes define here
 */
exports.ErrorCodes = {
    MONGO_ERROR: 'MONGO_ERROR',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
    SESSION_EXPIRED: 'SESSION_EXPIRED',
    NOT_FOUND: 'NOT_FOUND',
    SINGLE_MATCH: 'SINGLE_MATCH',
    MULTIPLE_MATCH: 'MULTIPLE_MATCH',
    DUPLICATE: 'DUPLICATE',
    SKIP: 'SKIP',
    EXISTS: 'EXISTS',
};
