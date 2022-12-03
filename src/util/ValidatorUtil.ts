import {RuleObject} from "antd/lib/form";

export type ValidateFunctionType<T> = (rule: RuleObject, value: T) => Promise<void>
type GetLengthValidatorParameterType = {
    min: number;
    message?: string
}

const lengthValidator = (param: GetLengthValidatorParameterType): ValidateFunctionType<string> => {
  const accountValidator: ValidateFunctionType<string> = async (rule: RuleObject, value: string): Promise<void> => {
    if (value.length < param.min) {
      throw new Error(param.message || `不能小于${param.min}位`)
    }
  }

  return accountValidator
}

const minValidator = (param: {min: number; message: string}): ValidateFunctionType<string> => {
  const accountValidator: ValidateFunctionType<string> = async (rule: RuleObject, value: string): Promise<void> => {
    if (parseFloat(value) < param.min) {
      throw new Error(param.message || `不能小于${param.min}`)
    }
  }

  return accountValidator
}

export {lengthValidator, minValidator}
