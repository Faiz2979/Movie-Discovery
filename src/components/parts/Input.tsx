import type React from "react"

interface InputTextProps {
  label: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  id: string
  required?: boolean
}

const InputText: React.FC<InputTextProps> = ({ label, value, onChange, type = "text", id, required = false }) => {
  return (
    <div>
      <label htmlFor={id} className="block font-medium text-white oxanium oxanium-semibold text-md">
        {label}
      </label>
      <input
        id={id}
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-black shadow-sm  focus:outline-none focus:border-[#a10f0f] focus:ring-1 focus:ring-[#a10f0f]"
        type={type}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  )
}

export { InputText }

