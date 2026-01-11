import { LightningElement, api, wire } from "lwc";
import { getRecord, getFieldValue } from "lightning/uiRecordApi";

import AMOUNT_FIELD from "@salesforce/schema/Budget__c.Amount__c";
import TOTAL_EXPENSE_FIELD from "@salesforce/schema/Budget__c.TotalExpense__c";

export default class BudgetStatus extends LightningElement {
  @api recordId;

  @wire(getRecord, { recordId: "$recordId", fields: [AMOUNT_FIELD, TOTAL_EXPENSE_FIELD] })
  record;

  get amount() {
    return getFieldValue(this.record.data, AMOUNT_FIELD) ?? 0;
  }

  get totalExpense() {
    return getFieldValue(this.record.data, TOTAL_EXPENSE_FIELD) ?? 0;
  }

  get ratio() {
    const amount = Number(this.amount) || 0;
    const total = Number(this.totalExpense) || 0;
    if (amount <= 0) return 0;
    const v = (total / amount) * 100;
    return Math.max(0, Math.min(100, v));
  }
}
