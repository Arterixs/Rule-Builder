import type { UUID } from 'src/core/types'
import { TypeLogic, type GroupRules } from '../types/rule-builder.types'
import { generateUUID } from '../../../core/utils/generate-uuid'

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
