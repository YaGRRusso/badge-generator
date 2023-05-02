import { Slot } from '@radix-ui/react-slot'
import { clsx } from 'clsx'
import { InputHTMLAttributes, forwardRef } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string | null
  asChild?: boolean
}

const Input = forwardRef<any, InputProps>(
  ({ error, asChild, children, className, ...rest }, ref) => {
    const Comp = asChild ? Slot : 'input'

    return (
      <div className="flex flex-col gap-1">
        <Comp
          className={clsx(
            'w-full rounded bg-gray-200 px-4 py-2 text-lg placeholder:text-slate-600 dark:bg-slate-800 dark:text-slate-200',
            className
          )}
          ref={ref}
          {...rest}
        />
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    )
  }
)

Input.displayName = 'Input'
export default Input
