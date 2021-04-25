// Trying not to use a validation library
// import Vue from "vue";
// import VeeValidate from "vee-validate";
// Vue.use(VeeValidate);

import Guid from "../../utils/classes/common/guid"
import _Vue from "vue"
import { i18n } from "./i18n"
// import { LocalDate } from "@js-joda/core"

export type ValidationRule = (val: any) => boolean | string

/// Library Functions ///

// https://www.braemoor.co.uk/software/postcodes.shtml
function checkPostCode(toCheck: string): boolean {
  // Permitted letters depend upon their position in the postcode.
  const alpha1 = "[abcdefghijklmnoprstuwyz]" // Character 1
  const alpha2 = "[abcdefghklmnopqrstuvwxy]" // Character 2
  const alpha3 = "[abcdefghjkpmnrstuvwxy]" // Character 3
  const alpha4 = "[abehmnprvwxy]" // Character 4
  const alpha5 = "[abdefghjlnpqrstuwxyz]" // Character 5
  const BFPOa5 = "[abdefghjlnpqrst]" // BFPO alpha5
  const BFPOa6 = "[abdefghjlnpqrstuwzyz]" // BFPO alpha6

  // Array holds the regular expressions for the valid postcodes
  const pcexp: RegExp[] = []

  // BFPO postcodes
  pcexp.push(new RegExp("^(bf1)(\\s*)([0-6]{1}" + BFPOa5 + "{1}" + BFPOa6 + "{1})$", "i"))

  // Expression for postcodes: AN NAA, ANN NAA, AAN NAA, and AANN NAA
  pcexp.push(new RegExp("^(" + alpha1 + "{1}" + alpha2 + "?[0-9]{1,2})(\\s*)([0-9]{1}" + alpha5 + "{2})$", "i"))

  // Expression for postcodes: ANA NAA
  pcexp.push(new RegExp("^(" + alpha1 + "{1}[0-9]{1}" + alpha3 + "{1})(\\s*)([0-9]{1}" + alpha5 + "{2})$", "i"))

  // Expression for postcodes: AANA  NAA
  pcexp.push(
    new RegExp(
      "^(" + alpha1 + "{1}" + alpha2 + "{1}" + "?[0-9]{1}" + alpha4 + "{1})(\\s*)([0-9]{1}" + alpha5 + "{2})$",
      "i"
    )
  )

  // Exception for the special postcode GIR 0AA
  pcexp.push(/^(GIR)(\s*)(0AA)$/i)

  // Standard BFPO numbers
  pcexp.push(/^(bfpo)(\s*)([0-9]{1,4})$/i)

  // c/o BFPO numbers
  pcexp.push(/^(bfpo)(\s*)(c\/o\s*[0-9]{1,3})$/i)

  // Overseas Territories
  pcexp.push(/^([A-Z]{4})(\s*)(1ZZ)$/i)

  // Anguilla
  pcexp.push(/^(ai-2640)$/i)

  // Load up the string to check
  let postCode = toCheck

  // Assume we're not going to find a valid postcode
  let valid = false

  // Check the string against the types of post codes
  for (let i = 0; i < pcexp.length; i++) {
    if (pcexp[i].test(postCode)) {
      // The post code is valid - split the post code into component parts
      pcexp[i].exec(postCode)

      // Copy it back into the original string, converting it to uppercase and inserting a space
      // between the inward and outward codes
      postCode = RegExp.$1.toUpperCase() + " " + RegExp.$3.toUpperCase()

      // If it is a BFPO c/o type postcode, tidy up the "c/o" part
      postCode = postCode.replace(/C\/O\s*/, "c/o ")

      // If it is the Anguilla overseas territory postcode, we need to treat it specially
      if (toCheck.toUpperCase() == "AI-2640") {
        postCode = "AI-2640"
      }

      // Load new postcode back into the form element
      valid = true

      // Remember that we have found that the code is valid and break from loop
      break
    }
  }

  // Return with either the reformatted valid postcode or the original invalid postcode
  return valid
}

/**
 * A factory class for constructing validation rules.
 */
export class RuleSet {
  public notNegativeNumber(): ValidationRule {
    return (v: any): boolean | string => {
      if (v == null || v === "") {
        return true // ignore undefined or null values
      }

      if (isNaN(Number(v))) {
        return i18n.t("validation_not_number").toString()
      }

      if (Number(v) < 0) {
        return i18n.t("validation_negative").toString()
      }

      return true
    }
  }

  public numberInRange(
    min = Number.NEGATIVE_INFINITY,
    max = Number.POSITIVE_INFINITY,
    minInclusive = true,
    maxInclusive = true
  ): ValidationRule {
    return (v: any): boolean | string => {
      if (v == null || v === "") {
        return true // ignore undefined or null values
      }

      if (isNaN(Number(v))) {
        return i18n.t("validation_not_number").toString()
      }

      if (v !== undefined && (Number(v) <= min || Number(v) >= max)) {
        if (!((minInclusive && Number(v) === min) || (maxInclusive && Number(v) === max))) {
          return i18n.t("validation_number_not_in_range").toString()
        }
      }
      return true
    }
  }

  public required(showRequiredIndicator = true): ValidationRule {
    const required = (v: any): boolean | string => {
      if (v === null || v === undefined) {
        return i18n.t("validation_required").toString()
      }

      // Required arrays must contain at least one value.
      if (Array.isArray(v) && v.length === 0) {
        return i18n.t("validation_required").toString()
      }

      // Required strings
      if (typeof v === "string" && v.trim().length == 0) {
        return i18n.t("validation_required").toString()
      }

      // Required Guid's
      if (Guid.isGuid(v) && v.toString() === Guid.EMPTY) {
        return i18n.t("validation_required").toString()
      }

      // Required booleans
      if (typeof v === "boolean" && v === false) {
        return i18n.t("validation_required").toString()
      }

      return true
    }
    return required
  }

  public requiredConditional(isRequired: boolean): ValidationRule {
    const required = (v: any): boolean | string => {
      if (!isRequired) {
        return true
      }

      if (v === null || v === undefined) {
        return i18n.t("validation_required").toString()
      }

      // Required arrays must contain at least one value.
      if (Array.isArray(v) && v.length === 0) {
        return i18n.t("validation_required").toString()
      }

      // Required strings
      if (typeof v === "string" && v.trim().length == 0) {
        return i18n.t("validation_required").toString()
      }

      // Required Guid's
      if (Guid.isGuid(v) && v.toString() === Guid.EMPTY) {
        return i18n.t("validation_required").toString()
      }

      // Required booleans
      if (typeof v === "boolean" && v === false) {
        return i18n.t("validation_required").toString()
      }

      return true
    }
    return required
  }

  public textLength(min = 0, max = 1000): ValidationRule {
    return (v: any): boolean | string => {
      if (v == undefined) {
        return true // ignore undefined or null values
      }

      const stringVal = String(v)

      if (stringVal.length < min) {
        return i18n.t("validation_text_short").toString()
      }

      if (stringVal.length > max) {
        return i18n.t("validation_text_long").toString()
      }

      return true
    }
  }

  public alphaNumeric(): ValidationRule {
    return (v: any): boolean | string => {
      if (v == undefined) {
        return true
      }

      const stringVal = String(v)
      const regex = /^[A-Za-z0-9]*$/

      if (!regex.test(stringVal)) {
        return i18n.t("validation_invalid_alpha_numeric").toString()
      }

      return true
    }
  }

  public emails(): ValidationRule {
    // Supports validation for semi-colon separated email values
    return (v: any): boolean | string => {
      if (!v) {
        return true // ignore undefined or null values
      }

      const stringVal = String(v)

      // eslint-disable-next-line no-useless-escape
      const re = /^((([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))(\s*;\s*|\s*))+$/

      if (!re.test(stringVal.toLowerCase())) {
        return i18n.t("validation_invalid_emails").toString()
      }

      return true
    }
  }

  public email(): ValidationRule {
    return (v: any): boolean | string => {
      if (!v) {
        return true // ignore undefined or null values
      }

      const stringVal = String(v)

      // eslint-disable-next-line no-useless-escape
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      if (!re.test(stringVal.toLowerCase())) {
        return i18n.t("validation_invalid_email").toString()
      }

      return true
    }
  }

  public password(): ValidationRule {
    return (v: any): boolean | string => {
      if (!v) {
        return true // ignore undefined or null values
      }

      const stringVal = String(v)

      // Regex forces at least 7 + 1 characters to match with the last not being whitespace
      // Matches even when the last character is the required
      // eslint-disable-next-line no-useless-escape
      const re = /^(?!\s)((?=.*[A-Za-z])(?=.*(\d|[^a-zA-Z\d])).{7,}?[^\s])$/

      if (!re.test(stringVal)) {
        return i18n.t("validation_invalid_password").toString()
      }

      return true
    }
  }

  //   public dateInPast(): ValidationRule {
  //     return (v: any): boolean | string => {
  //       const strVal = String(v)
  //       const date = api.tenantService.parseDate(strVal)
  //       if (date.isBefore(api.tenantService.today)) {
  //         return messages.validation_date_in_past
  //       }
  //       return true
  //     }
  //   }

  dateBeforeOrEqual(earliestDate?: Date, dateDescription?: string): ValidationRule {
    return (v: any): boolean | string => {
      if (!v || !earliestDate) {
        return true
      }
      const strVal = String(v)
      const date = new Date(strVal)
      if (date > earliestDate) {
        if (!dateDescription) {
          dateDescription = earliestDate.toLocaleString()
        }
        return i18n.t("validation_date_after_date_given") + " " + dateDescription
      }
      return true
    }
  }

  dateAfterOrEqual(earliestDate: Date, dateDescription?: string): ValidationRule {
    return (v: any): boolean | string => {
      if (!v || !earliestDate) {
        return true
      }
      const strVal = String(v)
      const date = new Date(strVal)
      if (date < earliestDate) {
        if (!dateDescription) {
          dateDescription = earliestDate.toLocaleString()
        }
        return i18n.t("validation_date_before_date_given") + " " + dateDescription
      }
      return true
    }
  }

  public postCode(): ValidationRule {
    return (v: any): boolean | string => {
      if (v == undefined) {
        return true // ignore undefined or null values
      }

      const stringVal = String(v)

      return checkPostCode(stringVal) || i18n.t("validation_invalid_postcode").toString()
    }
  }

  //   public isBrewmanBarcodeOfTypes(labelTypes: EnumBrewmanBarcodeType[]): ValidationRule {
  //     return (v: any): boolean | string => {
  //       if (v == undefined) {
  //         return true // ignore undefined or null values
  //       }

  //       if (v === "") {
  //         return true // ignore empty
  //       }

  //       const stringVal = String(v)

  //       const validBarcodeType = validateBrewmanBarcode(stringVal)

  //       if (validBarcodeType == EnumBrewmanBarcodeType.none) {
  //         return i18n.t("validation_invalid_barcode").toString()
  //       }

  //       if (!labelTypes.includes(validBarcodeType)) {
  //         return i18n.t("validation_wrong_barcode").toString()
  //       }

  //       return true
  //     }
  //   }

  //   public notContainedInArray(existingValues: any[]): ValidationRule {
  //     return (v: any): boolean | string => {
  //       if (v == undefined) {
  //         return true // ignore undefined or null values
  //       }

  //       if (v === "") {
  //         return true // ignore empty strings
  //       }

  //       return (
  //         !existingValues.some((existingValue) => existingValue === v) ||
  //         i18n.t("validation_duplicate_value_already_exists").toString()
  //       )
  //     }
  //   }
}
export const ruleSet = new RuleSet()

export function RuleSetPlugin(Vue: typeof _Vue): void {
  Vue.prototype.$ruleSet = ruleSet
}

_Vue.use(RuleSetPlugin)
