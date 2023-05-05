import { clsx } from 'clsx'
import { SelectHTMLAttributes, forwardRef } from 'react'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: {
    value: string
    label: string
  }[]
}

const Select = forwardRef<any, SelectProps>(
  ({ options, children, className, ...rest }, ref) => {
    return (
      <select
        className={clsx(
          'rounded bg-gray-200 p-2 hover:bg-gray-300 dark:bg-slate-800 dark:text-slate-200',
          className
        )}
        ref={ref}
        {...rest}
      >
        {options.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    )
  }
)

Select.displayName = 'Select'
export default Select
