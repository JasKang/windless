// https://github.com/alibaba/hooks/blob/7fad40bae29e52aec61a1fbdcbe13d67f1ad400f/packages/hooks/src/useControllableValue/index.ts

import { type SetStateAction, useMemo, useRef } from 'react'
import { useMemoizedFn, useUpdate } from 'ahooks'
import { isFunction } from 'kotl'

export interface Options<T> {
  defaultValue?: T
  defaultValuePropName?: string
  valuePropName?: string
  trigger?: string
}

export type Props = Record<string, any>

export interface StandardProps<T> {
  value: T
  defaultValue?: T
  onChange: (val: T) => void
}

function useValue<T = any>(props: StandardProps<T>): [T, (v: SetStateAction<T>) => void]
function useValue<T = any>(props?: Props, options?: Options<T>): [T, (v: SetStateAction<T>, ...args: any[]) => void]
function useValue<T = any>(props: Props = {}, options: Options<T> = {}) {
  const { defaultValue, defaultValuePropName = 'defaultValue', valuePropName = 'value', trigger = 'onChange' } = options

  const value = props[valuePropName] as T
  const isControlled = typeof props[valuePropName] !== 'undefined'

  const initialValue = useMemo(() => {
    if (isControlled) {
      return value
    }
    if (typeof props[defaultValuePropName] !== 'undefined') {
      return props[defaultValuePropName]
    }
    return defaultValue
  }, [])

  const stateRef = useRef(initialValue)
  if (isControlled) {
    stateRef.current = value
  }

  const update = useUpdate()

  function setState(v: SetStateAction<T>, ...args: any[]) {
    const r = isFunction(v) ? v(stateRef.current) : v

    if (!isControlled) {
      stateRef.current = r
      update()
    }
    if (props[trigger]) {
      props[trigger](r, ...args)
    }
  }

  return [stateRef.current, useMemoizedFn(setState)] as const
}

export default useValue
