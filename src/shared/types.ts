import type { FC, PropsWithChildren } from 'react'
import type { Prettify } from 'kotl'

export type ReactFC<T> = FC<Prettify<PropsWithChildren<T>>>
