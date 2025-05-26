import { TypeLogic, type GroupRules, type UUID } from '../types'
import { generateUUID } from './generate-uuid'

export const generateGroup = (parentId: UUID | null = null, name = 'Group'): GroupRules => ({
  id: generateUUID(),
  parentGroupId: parentId,
  name,
  type: TypeLogic.AND,
  filters: [],
  isActive: true,
  isLocked: false,
  subgroups: []
})
