'use server'

import { type UploadedFileData } from 'uploadthing/types'
import { utapi } from 'utils/uploadthing/server'

/** @returns UFS URL or null */
export async function uploadAvatarActions(
  formData: FormData
): Promise<UploadedFileData | null> {
  const file = formData.get('file') as File
  console.time('uploadAvatarActions')
  const result = await utapi.uploadFiles(file)
  console.timeEnd('uploadAvatarActions')
  return result?.data ?? null
}
