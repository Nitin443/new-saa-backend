import Joi from "joi";

export class CallbackReply {
  Errors: Array<any> = [];
  Info: Array<any> = [];
  Data: Array<any> = [];
  ErrorCode: string = '';
  fieldErrors: FieldErrors;

  constructor() {
    this.fieldErrors = new FieldErrors();
  }

  AddFieldError(FieldName: string, Error: string) {
    this.ErrorCode = 'ERROR';
    this.fieldErrors.Add(FieldName, Error);
  }

  merge(reply: CallbackReply) {
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
  mergeErrors(reply: CallbackReply) {
    this.Errors = this.Errors.concat(reply.Errors);
    this.Info = this.Info.concat(reply.Info);
    this.setErrorCode();
  }
  AddErrors(errors: any) {
    this.ErrorCode = 'ERROR';
    if (errors instanceof Array) {
      errors.forEach((err: any) => {
        if (err instanceof CallbackReply) {
          err.fieldErrors.List.forEach((fe: FieldError) => {
            fe.Errors.forEach((er2: string) => {
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
    } else {
      this.ErrorCode = 'ERROR';
    }
  }
  AddJOIErrors(result: Joi.ValidationResult) {
    if (result.error === undefined) {
      return;
    }
    this.ErrorCode = ErrorCodes.ERROR;
    this.Errors = result.error.details.map((e) => {
      return e.message + " | " + e.path + " | " + e.type
    })
  }
}

export class FieldError {
  FieldName: string;
  Errors: Array<string>;
  constructor() {
    this.FieldName = '';
    this.Errors = new Array();
  }
}

export class FieldErrors {
  List: Array<FieldError>;
  constructor() {
    this.List = new Array();
  }
  Add(FieldName: string, Error: string) {
    let found: boolean = false;
    //Check if field already exists within Array
    this.List.forEach((FE: FieldError, n: number) => {
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

  merge(Input: FieldErrors) {
    Input.List.forEach((FE: FieldError) => {
      FE.Errors.forEach((E: string) => {
        this.Add(FE.FieldName, E);
      });
    });
  }
}





/**
 * Error codes define here
 */

export let ErrorCodes = {
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