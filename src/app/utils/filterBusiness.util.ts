import { IBusiness } from "../models/business.model"

export class FilterBusiness {
  public filterItems(value: string, business: IBusiness[]): IBusiness[] {
    if (!value || value.trim() === '') {
      return business
    }

    const valArray = value.split(',')

    return business.filter(businessEl => {
      const tests = []
      for (const val of valArray) {
        const res = this.isSearchable(businessEl, val)
        tests.push(res)
      }
      return tests.some(test => test)
    })
  }

  private isSearchable(schedule: IBusiness, element: string): boolean {
    return (
      schedule.name.toLowerCase().indexOf(element.toLowerCase().trim()) > -1 ||
      schedule.business.toLowerCase().indexOf(element.toLowerCase().trim()) > -1
    )
  }
}
