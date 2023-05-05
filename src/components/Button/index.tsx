import { Slot } from '@radix-ui/react-slot'
import { clsx } from 'clsx'
import { ButtonHTMLAttributes, FC } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

const Button: FC<ButtonProps> = ({ asChild, children, className, ...rest }) => {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      className={clsx(
        'flex items-center justify-center gap-2 rounded bg-gray-200 p-1 px-6 py-4  text-lg transition-colors hover:bg-gray-300 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700',
        className
      )}
      type="submit"
      {...rest}
    >
      {children}
    </Comp>
  )
}

export default Button
