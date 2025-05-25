import type { FilterGroup, UUID } from '../types'
import { generateUUID } from './generate-uuid'

export const generateFilter = (groupId: UUID): FilterGroup => ({
  id: generateUUID(),
  groupId,
  field: null,
  operator: null,
  value: ''
})
