import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface StepProgressBarProps {
  currentStep: number
  steps: {
    title: string
    description?: string
  }[]
}

export function StepProgressBar({ currentStep, steps }: StepProgressBarProps) {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep
          const isUpcoming = stepNumber > currentStep

          return (
            <div key={index} className="flex items-center">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200",
                    isCompleted && "bg-green-500 border-green-500 text-white",
                    isCurrent && "bg-blue-500 border-blue-500 text-white",
                    isUpcoming && "bg-gray-100 border-gray-300 text-gray-500",
                  )}
                >
                  {isCompleted ? <Check className="h-5 w-5" /> : <span className="font-semibold">{stepNumber}</span>}
                </div>

                {/* Step Info */}
                <div className="mt-2 text-center">
                  <p
                    className={cn(
                      "text-sm font-medium",
                      isCompleted && "text-green-600",
                      isCurrent && "text-blue-600",
                      isUpcoming && "text-gray-500",
                    )}
                  >
                    {step.title}
                  </p>
                  {step.description && (
                    <p className="text-xs text-gray-500 mt-1 max-w-24 mx-auto">{step.description}</p>
                  )}
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-4 transition-all duration-200",
                    stepNumber < currentStep ? "bg-green-500" : "bg-gray-300",
                  )}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
