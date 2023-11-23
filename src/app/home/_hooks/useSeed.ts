// 此 hook 用于给数据库一个默认的数据

import { useEffect } from 'react'
import { api } from '~/trpc/react'

export async function useDBSeeding() {
  const query = api.category.listCategories.useQuery()
  const mutation = api.category.createCategories.useMutation()
  const names = ['餐饮', '交通', '购物', '娱乐', '服饰', '日用品', '医疗', '住房', '通讯', '人情', '其他']
  useEffect(() => {
    const categories = query.data
    if (categories && !categories.length) {
      mutation.mutate(names.map(name => ({ name })))
      console.log('[useDBSeeding] seeded categories')
    }
  }, [query.data])
}
