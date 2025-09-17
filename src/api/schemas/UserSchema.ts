import * as z from 'zod'

export const UserSchema = z.object({
  id: z.number(),
  employeeCode: z.string(), // Mã nhân viên
  username: z.string(), // Tên đăng nhập
  fullName: z.string(), // Họ và tên
  email: z.email(), // Email
  phoneNumber: z.string(), // Số điện thoại (có thể undefined)
  isActive: z.boolean(), // Trạng thái kích hoạt
  role: z.string(), // Vai trò người dùng
  token: z.string(), // Token (có thể undefined)
  createdAt: z.string(), // ISO date string
  updatedAt: z.string(), // ISO date string
})

// Kiểu dữ liệu User (hay còn gọi là model) được suy luận từ schema
export type User = z.infer<typeof UserSchema>
