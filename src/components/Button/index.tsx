import { Slot } from '@radix-ui/react-slot'
import { clsx } from 'clsx'
import { ButtonHTMLAttributes, FC } from 'react'

const buttonSizeVariants = {
  xs: 'p-1.5',
  md: 'px-6 py-4',
}

const buttonVariantVariants = {
  default:
    'bg-gray-200 hover:bg-gray-300 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700',
  light: 'hover:bg-gray-200 dark:hover:bg-slate-800',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  size?: keyof typeof buttonSizeVariants
  variant?: keyof typeof buttonVariantVariants
}

const Button: FC<ButtonProps> = ({
  asChild,
  size = 'md',
  variant = 'default',
  children,
  disabled,
  className,
  ...rest
}) => {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      className={clsx(
        'flex items-center justify-center gap-2 rounded text-lg transition-colors',
        buttonSizeVariants[size],
        buttonVariantVariants[variant],
        disabled && 'pointer-events-none opacity-50',
        className
      )}
      type="button"
      {...rest}
    >
      {children}
    </Comp>
  )
}

export default Button
