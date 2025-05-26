import type { FilterGroup, UUID } from '../types'
import { generateUUID } from './generate-uuid'

export const generateFilter = (groupId: UUID, name = 'Filter'): FilterGroup => ({
  id: generateUUID(),
  groupId,
  name,
  field: null,
  operator: null,
  value: ''
})
