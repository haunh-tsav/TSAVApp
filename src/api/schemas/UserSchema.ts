import * as z from 'zod'

export const UserSchema = z.object({
  id: z.string(),
  employeeCode: z.string().nullable(), // Mã nhân viên
  username: z.string(), // Tên đăng nhập
  fullName: z.string().nullable(), // Họ và tên
  email: z.string(), // Email
  phone: z.string(), // Số điện thoại (có thể undefined)
  isActive: z.boolean().nullable(), // Trạng thái kích hoạt
  role: z.string().nullable(), // Vai trò người dùng
  token: z.string().nullable(), // Token (có thể undefined)
  createdAt: z.string().nullable(), // ISO date string
  updatedAt: z.string().nullable(), // ISO date string
})

// Kiểu dữ liệu User (hay còn gọi là model) được suy luận từ schema
export type User = z.infer<typeof UserSchema>
