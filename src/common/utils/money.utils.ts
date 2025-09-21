export class MoneyUtils {
  static roundDecimal(value = 0): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }

  static toCents(dollars = 0): number {
    return Math.round(dollars * 100);
  }

  static toDollars(cents = 0): number {
    return MoneyUtils.roundDecimal(cents / 100);
  }
}

export class Money {
  constructor(private readonly cents) {}

  static zero() {
    return new Money(0);
  }

  static fromCents(cents = 0) {
    return new Money(Math.round(cents));
  }

  static fromDollars(dollars = 0) {
    return new Money(MoneyUtils.toCents(dollars));
  }

  toCents() {
    return this.cents;
  }

  toDollars() {
    return MoneyUtils.toDollars(this.cents);
  }

  isLess(cents: number): boolean {
    return cents < this.cents;
  }
}
