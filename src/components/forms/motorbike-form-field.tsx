
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface MotorbikeFormFieldProps {
  label: string
  name: string
  type?: "text" | "number" | "textarea" | "select"
  value: string | number
  onChange: (value: string | number) => void
  options?: { value: string; label: string }[]
  placeholder?: string
  required?: boolean
  error?: string
  className?: string
}

export function MotorbikeFormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  options,
  placeholder,
  required = false,
  error,
  className,
}: MotorbikeFormFieldProps) {
  const renderInput = () => {
    switch (type) {
      case "textarea":
        return (
          <Textarea
            id={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={cn(error && "border-red-500")}
            rows={4}
          />
        )

      case "select":
        return (
          <Select value={value.toString()} onValueChange={onChange}>
            <SelectTrigger className={cn(error && "border-red-500")}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      default:
        return (
          <Input
            id={name}
            type={type}
            value={value}
            onChange={(e) => onChange(type === "number" ? Number(e.target.value) : e.target.value)}
            placeholder={placeholder}
            className={cn(error && "border-red-500")}
          />
        )
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {renderInput()}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
