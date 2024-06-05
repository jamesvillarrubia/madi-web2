'use client'

import axios from 'axios'

export const uploadFiles = async (files: File[]) => {
  const formData = new FormData()

  files.forEach((file) => {
    formData.append('files', file)
  })
  const { data } = await axios<any>({
    method: 'POST',
    url: '/api/document/upload',
    data: formData,
    timeout: 1000 * 60 * 5
  })
  return data
}

export function defaultError(name: string) {
  return function () {
    throw new Error(`${name} function must be overridden`)
  }
}
