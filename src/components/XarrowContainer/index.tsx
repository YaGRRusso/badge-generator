import { FC, ReactNode } from 'react'
import Xarrow, { Xwrapper, xarrowPropsType } from 'react-xarrows'

export interface XarrowContainerProps {
  children: ReactNode
  xarrows: xarrowPropsType[]
}

const XarrowContainer: FC<XarrowContainerProps> = ({
  children,
  xarrows,
  ...rest
}) => {
  return (
    <Xwrapper {...rest}>
      {children}
      {xarrows.map(({ path, showHead, strokeWidth, ...item }, index) => (
        <Xarrow
          key={index}
          path={path || 'grid'}
          showHead={showHead || false}
          strokeWidth={strokeWidth || 1}
          {...item}
        />
      ))}
    </Xwrapper>
  )
}

export default XarrowContainer
