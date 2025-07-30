import { ref, onMounted, watch } from 'vue'
import { defineStore } from 'pinia'
import type { Account } from '@/types'

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>([])

  const addAccount = (account: Account) => {
    accounts.value.push(account)
  }

  const updateAccount = (index: number, newAccount: Account) => {
    accounts.value[index] = newAccount
  }

  const removeAccount = (index: number) => {
    accounts.value.splice(index, 1)
  }

  onMounted(() => {
    const saved = localStorage.getItem('accounts')
    if (saved) accounts.value = JSON.parse(saved)
  })

  watch(
    accounts,
    (val) => {
      localStorage.setItem('accounts', JSON.stringify(val))
    },
    { deep: true },
  )

  return {
    accounts,
    addAccount,
    updateAccount,
    removeAccount,
  }
})
