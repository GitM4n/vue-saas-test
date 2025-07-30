<script setup lang="ts">
import type { Account } from '@/types'
import AccountTableItem from './AccountTableItem.vue'
import { useAccountsStore } from '@/stores/accounts'

const accounts = defineModel<Account[]>()

const { updateAccount, removeAccount, addAccount } = useAccountsStore()
</script>

<template>
  <div class="table">
    <span class="table_header">Метки</span>
    <span>Тип записи</span>
    <span class="table_header">Логин</span>
    <span class="table_header">Пароль</span>
    <span class="table_header" />

    <AccountTableItem v-for="(account, index) in accounts" :key="index" :account :index />
  </div>
</template>

<style scoped>
.table {
  display: grid;
  grid-template-columns: minmax(150px, 1fr) 0.8fr minmax(120px, 1fr) minmax(120px, 1fr) auto;
  row-gap: 12px;
  column-gap: 12px;
  align-items: start;
}
</style>
