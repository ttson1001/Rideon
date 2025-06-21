import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "../../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card"
import { StepProgressBar } from "../../../../components/forms/step-progress-bar"
import { MotorbikeFormField } from "../../../../components/forms/motorbike-form-field"
import { UploadImages } from "../../../../components/forms/upload-images"
import { IdentityUpload } from "../../../../components/forms/identity-upload"
import { useToast } from "../../../../hooks/use-toast"

const steps = [
  {
    title: "Thông tin xe",
    description: "Nhập chi tiết về xe máy",
  },
  {
    title: "Hình ảnh & Giấy tờ",
    description: "Tải ảnh xe và giấy tờ",
  },
  {
    title: "Xác nhận",
    description: "Gửi yêu cầu duyệt",
  },
]

const brandOptions = [
  { value: "honda", label: "Honda" },
  { value: "yamaha", label: "Yamaha" },
  { value: "piaggio", label: "Piaggio" },
  { value: "suzuki", label: "Suzuki" },
  { value: "sym", label: "SYM" },
  { value: "other", label: "Khác" },
]

const vehicleTypeOptions = [
  { value: "tay_ga", label: "Tay ga" },
  { value: "con_tay", label: "Côn tay" },
  { value: "xe_so", label: "Xe số" },
  { value: "phan_khoi_lon", label: "Phân khối lớn" },
]

const licenseTypeOptions = [
  { value: "a1", label: "Bằng A1" },
  { value: "a2", label: "Bằng A2" },
  { value: "a3", label: "Bằng A3" },
  { value: "any", label: "Bất kỳ" },
]

export default function VehicleList() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form data
  const [formData, setFormData] = useState({
    // Vehicle info
    name: "",
    brand: "",
    year: new Date().getFullYear(),
    type: "",
    licensePlate: "",
    description: "",

    // Rental info
    pricePerDay: 0,
    licenseRequired: "",
    minAge: 18,
    quantity: 1,
    requiresDeposit: true,
    depositAmount: 2000000,
  })

  const [images, setImages] = useState<File[]>([])
  const [documents, setDocuments] = useState<{
    idCardFront?: File
    idCardBack?: File
    vehicleRegistration?: File
    authorization?: File
  }>({})

  const [errors, setErrors] = useState<Record<string, string>>({})

  const updateFormData = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Vui lòng nhập tên xe"
    if (!formData.brand) newErrors.brand = "Vui lòng chọn hãng xe"
    if (!formData.type) newErrors.type = "Vui lòng chọn loại xe"
    if (!formData.licensePlate.trim()) newErrors.licensePlate = "Vui lòng nhập biển số xe"
    if (!formData.description.trim()) newErrors.description = "Vui lòng nhập mô tả xe"
    if (formData.pricePerDay <= 0) newErrors.pricePerDay = "Giá thuê phải lớn hơn 0"
    if (!formData.licenseRequired) newErrors.licenseRequired = "Vui lòng chọn yêu cầu bằng lái"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (images.length < 3) {
      newErrors.images = "Vui lòng tải lên ít nhất 3 ảnh xe"
    }

    if (!documents.idCardFront) {
      newErrors.idCardFront = "Vui lòng tải ảnh CCCD mặt trước"
    }

    if (!documents.idCardBack) {
      newErrors.idCardBack = "Vui lòng tải ảnh CCCD mặt sau"
    }

    if (!documents.vehicleRegistration) {
      newErrors.vehicleRegistration = "Vui lòng tải ảnh đăng ký xe"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (currentStep === 1 && !validateStep1()) return
    if (currentStep === 2 && !validateStep2()) return

    setCurrentStep((prev) => Math.min(prev + 1, steps.length))
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep2()) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Đăng xe thành công!",
        description: "Xe của bạn đang được duyệt. Hệ thống sẽ phản hồi trong 24h.",
      })

      navigate("/dashboard/owner")
    } catch (error) {
      toast({
        title: "Có lỗi xảy ra",
        description: "Vui lòng thử lại sau",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/dashboard/owner" className="text-blue-600 hover:text-blue-800 flex items-center gap-1 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Quay lại Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Đăng xe cho thuê</h1>
          <p className="text-gray-600 mt-2">Điền thông tin chi tiết để đăng xe của bạn</p>
        </div>

        {/* Progress Bar */}
        <StepProgressBar currentStep={currentStep} steps={steps} />

        {/* Form Content */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle>{steps[currentStep - 1].title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Vehicle Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <MotorbikeFormField
                    label="Tên xe"
                    name="name"
                    value={formData.name}
                    onChange={(value) => updateFormData("name", value)}
                    placeholder="VD: Honda Air Blade 2023"
                    required
                    error={errors.name}
                  />

                  <MotorbikeFormField
                    label="Hãng xe"
                    name="brand"
                    type="select"
                    value={formData.brand}
                    onChange={(value) => updateFormData("brand", value)}
                    options={brandOptions}
                    placeholder="Chọn hãng xe"
                    required
                    error={errors.brand}
                  />

                  <MotorbikeFormField
                    label="Năm sản xuất"
                    name="year"
                    type="number"
                    value={formData.year}
                    onChange={(value) => updateFormData("year", value)}
                    required
                  />

                  <MotorbikeFormField
                    label="Loại xe"
                    name="type"
                    type="select"
                    value={formData.type}
                    onChange={(value) => updateFormData("type", value)}
                    options={vehicleTypeOptions}
                    placeholder="Chọn loại xe"
                    required
                    error={errors.type}
                  />

                  <MotorbikeFormField
                    label="Biển số xe"
                    name="licensePlate"
                    value={formData.licensePlate}
                    onChange={(value) => updateFormData("licensePlate", value)}
                    placeholder="VD: 59A1-12345"
                    required
                    error={errors.licensePlate}
                  />

                  <MotorbikeFormField
                    label="Giá thuê/ngày (VNĐ)"
                    name="pricePerDay"
                    type="number"
                    value={formData.pricePerDay}
                    onChange={(value) => updateFormData("pricePerDay", value)}
                    placeholder="150000"
                    required
                    error={errors.pricePerDay}
                  />

                  <MotorbikeFormField
                    label="Yêu cầu bằng lái"
                    name="licenseRequired"
                    type="select"
                    value={formData.licenseRequired}
                    onChange={(value) => updateFormData("licenseRequired", value)}
                    options={licenseTypeOptions}
                    placeholder="Chọn loại bằng lái"
                    required
                    error={errors.licenseRequired}
                  />

                  <MotorbikeFormField
                    label="Độ tuổi tối thiểu"
                    name="minAge"
                    type="number"
                    value={formData.minAge}
                    onChange={(value) => updateFormData("minAge", value)}
                    required
                  />
                </div>

                <MotorbikeFormField
                  label="Mô tả chi tiết"
                  name="description"
                  type="textarea"
                  value={formData.description}
                  onChange={(value) => updateFormData("description", value)}
                  placeholder="Mô tả tình trạng xe, đặc điểm nổi bật, điều kiện sử dụng..."
                  required
                  error={errors.description}
                />
              </div>
            )}

            {/* Step 2: Images and Documents */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <UploadImages images={images} onImagesChange={setImages} maxImages={5} minImages={3} />
                {errors.images && <p className="text-sm text-red-500">{errors.images}</p>}

                <IdentityUpload documents={documents} onDocumentsChange={setDocuments} />
                {(errors.idCardFront || errors.idCardBack || errors.vehicleRegistration) && (
                  <div className="text-sm text-red-500 space-y-1">
                    {errors.idCardFront && <p>{errors.idCardFront}</p>}
                    {errors.idCardBack && <p>{errors.idCardBack}</p>}
                    {errors.vehicleRegistration && <p>{errors.vehicleRegistration}</p>}
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Confirmation */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">Xác nhận thông tin</h3>

                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-gray-700">Tên xe:</p>
                      <p className="text-gray-900">{formData.name}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Hãng xe:</p>
                      <p className="text-gray-900">{brandOptions.find((b) => b.value === formData.brand)?.label}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Năm sản xuất:</p>
                      <p className="text-gray-900">{formData.year}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Giá thuê:</p>
                      <p className="text-gray-900 font-semibold text-blue-600">
                        {formData.pricePerDay.toLocaleString()}đ/ngày
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="font-medium text-gray-700">Số ảnh đã tải:</p>
                    <p className="text-gray-900">{images.length} ảnh</p>
                  </div>

                  <div className="mt-4">
                    <p className="font-medium text-gray-700">Giấy tờ đã tải:</p>
                    <ul className="text-gray-900 space-y-1">
                      <li>✓ CCCD mặt trước</li>
                      <li>✓ CCCD mặt sau</li>
                      <li>✓ Đăng ký xe</li>
                      {documents.authorization && <li>✓ Giấy ủy quyền</li>}
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-yellow-600">ℹ️</div>
                    <div className="text-sm text-yellow-800">
                      <p className="font-medium mb-1">Lưu ý:</p>
                      <ul className="space-y-1 text-xs">
                        <li>• Xe sẽ được admin duyệt trong vòng 24 giờ</li>
                        <li>• Bạn sẽ nhận thông báo qua email và app khi có kết quả</li>
                        <li>• Thông tin có thể được chỉnh sửa trước khi duyệt</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Button>

          <div className="flex gap-3">
            {currentStep < steps.length ? (
              <Button onClick={handleNext}>
                Tiếp tục
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-green-600 hover:bg-green-700">
                {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu duyệt"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
