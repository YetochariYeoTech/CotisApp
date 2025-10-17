export enum Role {
  ADMIN = "ADMIN",
  TREASURER = "TREASURER",
  AUDITOR = "AUDITOR",
  MEMBER = "MEMBER",
}

export enum PaymentType {
  ADHESION = "ADHESION",
  DUES = "DUES",
  EVENT = "EVENT",
  ACTIVATION = "ACTIVATION",
}

export enum TransactionStatus {
  PENDING = "PENDING",
  VALIDATED = "VALIDATED",
  CANCELLED = "CANCELLED",
}

export enum DuesStatus {
  PAID = "PAID",
  UNPAID = "UNPAID",
  PARTIALLY_PAID = "PARTIALLY_PAID",
}

export enum ContributionStatus {
  UP_TO_DATE = "UP_TO_DATE",
  LATE = "LATE",
  EXEMPTED = "EXEMPTED",
}

export enum AccountStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}
