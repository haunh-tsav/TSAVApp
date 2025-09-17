// Dùng MMKV để lưu trữ dữ liệu cục bộ thay vì AsyncStorage
// MMKV nhanh hơn và hiệu quả hơn, đặc biệt với lượng dữ liệu lớn hoặc truy cập thường xuyên
// Thích hợp cho các ứng dụng cần hiệu suất cao và phản hồi nhanh
// Xem thêm:
// https://github.com/mrousavy/react-native-mmkv
// https://reactnative.dev/docs/asyncstorage
import { MMKV } from 'react-native-mmkv'

const storage = new MMKV()

// Adapter để dùng với TanStack Query
export const storageMMKV = {
  getItem: (key: string): string | undefined => {
    return storage.getString(key) ?? undefined
  },
  removeItem: (key: string): void => {
    storage.delete(key)
  },
  setItem: (key: string, value: string): void => {
    storage.set(key, value)
  },
}
