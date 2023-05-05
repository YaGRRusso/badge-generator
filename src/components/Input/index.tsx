import { clsx } from 'clsx'
import { InputHTMLAttributes, forwardRef } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string | null
  full?: boolean
}

const Input = forwardRef<any, InputProps>(
  ({ error, full, children, className, ...rest }, ref) => {
    return (
      <div className={clsx('flex flex-col gap-1', full && 'flex-1')}>
        <input
          className={clsx(
            'h-10 w-full rounded bg-gray-200 px-4 py-2 text-lg placeholder:text-slate-600 dark:bg-slate-800 dark:text-slate-200',
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
