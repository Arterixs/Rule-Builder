import type { UUID as typeUUID } from 'node:crypto';

export type UUID = typeUUID

export const enum TypeLogic {
  AND = 'AND',
  OR = 'OR'
}

export const enum Field {
  GENDER = 'gender',
  BIRTH_DATE = 'birth_date',
  CHANNEL = 'channel'
}

export const enum Operator {
  EQUALS = 'equals',
  NOT_EQUALS = 'not equals',
  IS_AFTER = 'is after',
  IS_BEFORE = 'is before'
}

export interface FilterGroup {
  id: UUID
  groupId: UUID
  field: Field | null
  operator: Operator | null
  value: string
}

export interface GroupRules {
  id: UUID,
  parentGroupId: UUID | null
  name: string
  type: TypeLogic
  filters: FilterGroup[]
  isActive: boolean
  isLocked: boolean
  subgroups: GroupRules[]
}
