import type { ComponentProps } from 'react'
import useValue from '@/hooks/useValue'

export type ListItemValueType = {
  value: string
  label?: string
  disabled?: boolean
  children?: ListItemType[]
}

export type ListItemGroupType = {
  type: 'group'
  label: string
  children: ListItemValueType[]
}

export type ListItemDividerType = {
  type: 'divider'
}

export type ListItemType = ListItemValueType | ListItemGroupType | ListItemDividerType

export const isDividerItem = (item: ListItemType): item is ListItemDividerType =>
  'type' in item && item.type === 'divider'
export const isGroupItem = (item: ListItemType): item is ListItemGroupType => 'type' in item && item.type === 'group'

type ListboxProps = {
  value?: string
  onChange?: (value: string) => void
  defaultValue?: string
  items: ListItemType[]
  itemRender?: (item: ListItemValueType) => React.ReactNode
  onClick?: (item: ListItemValueType) => void
}

export const ListBoxItem = (props: ComponentProps<'div'> & { item: ListItemValueType }) => {
  const { item, ...others } = props
  // <div
  //   :data-disabled="item.disabled"
  //   @click="emit('click', item)"
  //   class="hover:bg-input-background-hover relative w-full cursor-pointer items-center overflow-hidden rounded text-sm transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
  // >
  //   <slot :item="item">
  //     <div class="flex w-full items-center py-1.5 px-2">
  //       <span class="flex-1 overflow-hidden text-ellipsis text-nowrap">
  //         {{ item.label }}
  //       </span>
  //     </div>
  //   </slot>
  // </div>
  return (
    <div
      {...others}
      className="hover:bg-input-background-hover relative w-full cursor-pointer items-center overflow-hidden rounded text-sm transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
    >
      <div className="flex w-full items-center py-1.5 px-2">
        <span className="flex-1 overflow-hidden text-ellipsis text-nowrap">{item.label}</span>
      </div>
    </div>
  )
}

export const Listbox = (props: ListboxProps) => {
  const [value, setValue] = useValue(props)

  return (
    <div className="space-y-1 p-1 text-sm">
      {props.items.map((item, i) => {
        if (isDividerItem(item)) {
          return <div className="bg-line -mx-1 my-1 h-px" key={item.type + i}></div>
        } else if (isGroupItem(item)) {
          return (
            <div className="border-line -mx-1 my-1 border-t border-b p-1" key={item.label}>
              <div className="text-mute py-1 px-2 font-medium">{item.label}</div>
              <div className="mt-1 space-y-1">
                {item.children.map(groupItem => (
                  <ListBoxItem item={groupItem} onClick={() => props.onClick?.(item)}></ListBoxItem>
                ))}
              </div>
            </div>
          )
        } else {
          return <ListBoxItem item={item} onClick={() => props.onClick?.(item)}></ListBoxItem>
        }
      })}
    </div>
  )
}
