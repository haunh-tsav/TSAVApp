// Định nghĩa schema trên db

export type User = {
  createdAt: string // ISO date string
  email: string // Email
  employeeCode: string // Mã nhân viên
  fullName: string // Họ và tên
  isActive: boolean // Trạng thái kích hoạt
  phoneNumber: string // Số điện thoại (có thể undefined)
  role: string // Vai trò người dùng
  token?: string // Token (có thể undefined)
  updatedAt: string // ISO date string
  userId: number // ID người dùng
  username: string // Tên đăng nhập
}
