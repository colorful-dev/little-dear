type LazyValueGetter<T, Params = void> = (params?: Params) => T

type ValueGetter<T, Params = void> = T | LazyValueGetter<T, Params>

type InferValueGetter<T> = T extends ValueGetter<infer U> ? U : never

function isLazyValueGetter<T, Params = void>(value: ValueGetter<T, Params>): value is LazyValueGetter<T, Params> {
  return typeof value === 'function'
}

function getRealValue<T, Params = void>(value: ValueGetter<T, Params>, params?: Params) {
  if (isLazyValueGetter(value))
    return value(params)

  return value
}

export function createPolicyMode<T extends Record<string, unknown>>(mapping: Partial<{ [X in keyof T]: ValueGetter<T[X]> } & { default: unknown }>) {
  return <Key extends keyof T, V = InferValueGetter<T[Key]>>(key: Exclude<Key, 'default'>): V => {
    const value = mapping[key] ?? mapping.default

    if (value === undefined || value === null)
      return value as V

    return getRealValue(value) as V
  }
}
