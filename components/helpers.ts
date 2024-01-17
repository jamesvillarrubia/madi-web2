'use client'

// import { useCallback, useEffect, useRef, useState } from 'react'
// import toast from 'react-hot-toast'
import axios from 'axios'
// import { v4 as uuid } from 'uuid'
// import { ChatGPTInstance } from './Chat/Chat.component'
// import { useSearchParams } from 'next/navigation'

// import { ChatMessage, Chat, Persona, Tool } from './interface'
// import { useToast } from '.'

export const uploadFiles = async (files: File[]) => {
  let formData = new FormData()

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


