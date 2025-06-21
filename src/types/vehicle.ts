export interface PendingVehicle {
  id: string
  name: string
  owner: string
  submittedDate: string
  status: "pending" | "approved" | "rejected"
  image: string
  type: string
  price: string
  documentsCount: number
  imagesCount: number
  completeness: number
  description: string
  location: string
  year: string
  brand: string
  model: string
  licensePlate: string
  engineSize: string
  fuelType: string
  transmission: string
  features: string[]
  images: string[]
  documents: {
    registration: string
    insurance: string
    inspection: string
  }
  ownerInfo: {
    name: string
    phone: string
    email: string
    idCard: string
    address: string
    joinDate: string
    rating: number
    totalVehicles: number
  }
} 