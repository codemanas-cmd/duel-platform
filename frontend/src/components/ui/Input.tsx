import React from "react"

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const Input: React.FC<InputProps> = ({ label, className, ...props }) => {
  return (
    <div className="space-y-2">
      {label && <label className="text-sm">{label}</label>}
      <input
        {...props}
        className={`w-full bg-zinc-900 border border-orange-400 rounded-md px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-600 ${className}`}
      />
    </div>
  )
}

export { Input }
