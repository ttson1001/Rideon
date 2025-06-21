import type React from "react"

import { useState, useCallback } from "react"
import { Upload, X } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { useToast } from "../../hooks/use-toast"

interface UploadImagesProps {
  images: File[]
  onImagesChange: (images: File[]) => void
  maxImages?: number
  minImages?: number
  maxSizeInMB?: number
}

export function UploadImages({
  images,
  onImagesChange,
  maxImages = 5,
  minImages = 3,
  maxSizeInMB = 5,
}: UploadImagesProps) {
  const [dragActive, setDragActive] = useState(false)
  const { toast } = useToast()

  const validateFile = (file: File): boolean => {
    // Check file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Lỗi định dạng file",
        description: "Chỉ chấp nhận file ảnh (JPG, PNG, WEBP)",
        variant: "destructive",
      })
      return false
    }

    // Check file size
    if (file.size > maxSizeInMB * 1024 * 1024) {
      toast({
        title: "File quá lớn",
        description: `Kích thước file không được vượt quá ${maxSizeInMB}MB`,
        variant: "destructive",
      })
      return false
    }

    return true
  }

  const handleFiles = useCallback(
    (fileList: FileList) => {
      const newFiles = Array.from(fileList)
      const validFiles: File[] = []

      for (const file of newFiles) {
        if (validateFile(file)) {
          validFiles.push(file)
        }
      }

      if (images.length + validFiles.length > maxImages) {
        toast({
          title: "Quá số lượng ảnh cho phép",
          description: `Chỉ được tải tối đa ${maxImages} ảnh`,
          variant: "destructive",
        })
        return
      }

      onImagesChange([...images, ...validFiles])
    },
    [images, maxImages, onImagesChange, toast],
  )

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFiles(e.dataTransfer.files)
      }
    },
    [handleFiles],
  )

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files)
    }
  }

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    onImagesChange(newImages)
  }

  const getImageUrl = (file: File) => {
    return URL.createObjectURL(file)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Hình ảnh xe</h3>
        <span className="text-sm text-gray-500">
          {images.length}/{maxImages} ảnh (tối thiểu {minImages})
        </span>
      </div>

      {/* Upload Area */}
      <Card
        className={`border-2 border-dashed transition-colors ${
          dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300"
        }`}
      >
        <CardContent className="p-8">
          <div
            className="text-center"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <div className="space-y-2">
              <p className="text-lg font-medium text-gray-900">Kéo thả ảnh vào đây</p>
              <p className="text-gray-500">hoặc</p>
              <Button type="button" variant="outline" asChild>
                <label className="cursor-pointer">
                  Chọn file từ máy tính
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileInput}
                    className="hidden"
                    disabled={images.length >= maxImages}
                  />
                </label>
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-4">Chấp nhận JPG, PNG, WEBP. Tối đa {maxSizeInMB}MB mỗi file.</p>
          </div>
        </CardContent>
      </Card>

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {images.map((file, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square relative overflow-hidden rounded-lg border">
                <img
                  src={getImageUrl(file) || "/placeholder.svg"}
                  alt={`Ảnh xe ${index + 1}`}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200" />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeImage(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1 truncate">{file.name}</p>
            </div>
          ))}
        </div>
      )}

      {/* Validation Message */}
      {images.length < minImages && <p className="text-sm text-red-500">Vui lòng tải lên ít nhất {minImages} ảnh xe</p>}
    </div>
  )
}
