import { Upload, FileText, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface IdentityUploadProps {
  documents: {
    idCardFront?: File
    idCardBack?: File
    vehicleRegistration?: File
    authorization?: File
  }
  onDocumentsChange: (documents: {
    idCardFront?: File
    idCardBack?: File
    vehicleRegistration?: File
    authorization?: File
  }) => void
}

export function IdentityUpload({ documents, onDocumentsChange }: IdentityUploadProps) {
  const { toast } = useToast()

  const validateFile = (file: File): boolean => {
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Lỗi định dạng file",
        description: "Chỉ chấp nhận file ảnh",
        variant: "destructive",
      })
      return false
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File quá lớn",
        description: "Kích thước file không được vượt quá 10MB",
        variant: "destructive",
      })
      return false
    }

    return true
  }

  const handleFileUpload = (type: keyof typeof documents, file: File) => {
    if (validateFile(file)) {
      onDocumentsChange({
        ...documents,
        [type]: file,
      })
    }
  }

  const DocumentUploadCard = ({
    title,
    description,
    type,
    required = true,
  }: {
    title: string
    description: string
    type: keyof typeof documents
    required?: boolean
  }) => {
    const file = documents[type]

    return (
      <Card className="border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            {file ? <CheckCircle className="h-4 w-4 text-green-500" /> : <FileText className="h-4 w-4" />}
            {title}
            {required && <span className="text-red-500">*</span>}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-xs text-gray-600 mb-3">{description}</p>

          {file ? (
            <div className="space-y-2">
              <p className="text-sm text-green-600 font-medium">✓ Đã tải lên: {file.name}</p>
              <Button type="button" variant="outline" size="sm" asChild className="w-full">
                <label className="cursor-pointer">
                  Thay đổi file
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const newFile = e.target.files?.[0]
                      if (newFile) {
                        handleFileUpload(type, newFile)
                      }
                    }}
                    className="hidden"
                  />
                </label>
              </Button>
            </div>
          ) : (
            <Button type="button" variant="outline" size="sm" asChild className="w-full">
              <label className="cursor-pointer flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Tải lên
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const newFile = e.target.files?.[0]
                    if (newFile) {
                      handleFileUpload(type, newFile)
                    }
                  }}
                  className="hidden"
                />
              </label>
            </Button>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Giấy tờ xác thực</h3>
        <p className="text-sm text-gray-600">Tải lên các giấy tờ cần thiết để xác thực danh tính và quyền sở hữu xe</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <DocumentUploadCard
          title="CCCD/CMND mặt trước"
          description="Ảnh rõ nét, đầy đủ 4 góc của CCCD/CMND"
          type="idCardFront"
        />

        <DocumentUploadCard
          title="CCCD/CMND mặt sau"
          description="Ảnh rõ nét, đầy đủ 4 góc của CCCD/CMND"
          type="idCardBack"
        />

        <DocumentUploadCard
          title="Đăng ký xe (Cà vẹt)"
          description="Giấy đăng ký xe máy còn hiệu lực"
          type="vehicleRegistration"
        />

        <DocumentUploadCard
          title="Giấy ủy quyền (nếu có)"
          description="Nếu không phải chính chủ xe"
          type="authorization"
          required={false}
        />
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="text-yellow-600">⚠️</div>
          <div className="text-sm text-yellow-800">
            <p className="font-medium mb-1">Lưu ý quan trọng:</p>
            <ul className="space-y-1 text-xs">
              <li>• Tất cả giấy tờ phải rõ nét, đầy đủ thông tin</li>
              <li>• CCCD/CMND phải còn hiệu lực</li>
              <li>• Đăng ký xe phải trùng khớp với thông tin xe đăng ký</li>
              <li>• Thông tin sẽ được bảo mật tuyệt đối</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
