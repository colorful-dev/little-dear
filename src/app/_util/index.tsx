import React, { type ComponentType, type PropsWithChildren } from 'react'

export function withDefaultProps<P extends object>(
  WrappedComponent: ComponentType<P>,
  defaultProps: Partial<P>,
) {
  const comp = function (props: PropsWithChildren<P>): JSX.Element {
    const combinedProps = { ...defaultProps, ...props }
    return <WrappedComponent {...combinedProps} />
  }
  comp.displayName = WrappedComponent.displayName
  return comp
}

export const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
