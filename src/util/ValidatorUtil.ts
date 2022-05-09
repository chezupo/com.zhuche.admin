import {RuleObject} from "antd/lib/form";

export type ValidateFunctionType = (rule: RuleObject, value: string) => Promise<void>
type GetLengthValidatorParameterType = {
    min: number;
    message?: string
}

const lengthValidator = (param: GetLengthValidatorParameterType): ValidateFunctionType => {
  const accountValidator: ValidateFunctionType = async (rule: RuleObject, value: string): Promise<void> => {
    if (value.length < param.min) {
      throw new Error(param.message || `不能小于${param.min}位`)
    }
  }

  return accountValidator
}

const minValidator = (param: {min: number; message: string}): ValidateFunctionType => {
  const accountValidator: ValidateFunctionType = async (rule: RuleObject, value: string): Promise<void> => {
    if (parseFloat(value) < param.min) {
      throw new Error(param.message || `不能小于${param.min}`)
    }
  }

  return accountValidator
}

export {lengthValidator, minValidator}
