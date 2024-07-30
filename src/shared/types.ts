import type { ComponentProps, FC } from 'react'
import type { Prettify } from 'kotl'

export type PureFC<T = {}> = FC<Prettify<T>>
export type HtmlFC<D extends keyof JSX.IntrinsicElements, T> = FC<T & ComponentProps<D>>

export type InputProps = Prettify<{
  label: string
}> &
  ComponentProps<'input'>

type GetEventHandlers<T extends keyof JSX.IntrinsicElements> = Extract<keyof JSX.IntrinsicElements[T], `on${string}`>

/**
 * Provides the event type for a given element and handler.
 *
 * @example
 *
 * type MyEvent = EventFor<"input", "onChange">;
 */
export type EventFor<
  TElement extends keyof JSX.IntrinsicElements,
  THandler extends GetEventHandlers<TElement>,
> = JSX.IntrinsicElements[TElement][THandler] extends ((e: infer TEvent) => any) | undefined ? TEvent : never
