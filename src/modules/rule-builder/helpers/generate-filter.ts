import type { UUID } from 'core/types'
import { generateUUID } from 'core/utils/generate-uuid'
import type { FilterGroup } from '../types/rule-builder.types'

export const generateFilter = (groupId: UUID, name = 'Filter'): FilterGroup => ({
  id: generateUUID(),
  groupId,
  name,
  field: null,
  operator: null,
  value: ''
})
