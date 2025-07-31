import type { Account } from '@/types'
import { ref } from 'vue'

type ErrorKeys = keyof Omit<Account, 'mark' | 'type'>

export const useAccountValidation = (account: Account) => {
  const errors = ref<Record<ErrorKeys, string[]>>({
    login: [],
    password: [],
  })

  function validate(field: ErrorKeys) {
    errors.value[field] = []
    if (!account[field] || !account[field].length) {
      errors.value[field].push('Поле обязательно для заполнения')
    }

    return errors.value[field].length === 0
  }

  return {
    errors,
    validate,
  }
}
