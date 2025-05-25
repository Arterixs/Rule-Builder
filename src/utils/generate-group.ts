import { TypeLogic, type GroupRules, type UUID } from '../types'
import { generateUUID } from './generate-uuid'

export const generateGroup = (parentId: UUID | null = null): GroupRules => ({
  id: generateUUID(),
  parentGroupId: parentId,
  name: 'Group',
  type: TypeLogic.AND,
  filters: [],
  isActive: true,
  isLocked: false,
  subgroups: []
})
