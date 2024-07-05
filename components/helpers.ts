/** AUTO-SUMMARY **
   Purpose: This file provides functionality for uploading files to a server and includes a utility function for handling default errors in overridden functions.

   Key Components:
   - `UploadResponse`: Interface defining the structure of the response data from the upload operation.
   - `uploadFiles`: Asynchronous function to upload an array of files using FormData and axios.
   - `defaultError`: Function that generates a function to throw an error when a required function is not overridden.

   Functional Overview: The file includes an `uploadFiles` function that handles the uploading of files to a specified API endpoint using axios for HTTP requests. It constructs a FormData object, appends files to it, and sends it to the server. Additionally, there is a `defaultError` function designed to enforce the implementation of required functions in other parts of the code.

   Dependencies and Integrations: Depends on the `axios` library for making HTTP requests. The `uploadFiles` function interacts with the server-side API at the endpoint `/api/document/upload`.

   Additional Context: The `uploadFiles` function is designed to handle potentially large file uploads with a generous timeout setting. The `defaultError` function provides a template for error handling in cases where certain functions are expected to be implemented by the user but are not.
*** END-SUMMARY **/
'use client'

import axios from 'axios'

interface UploadResponse {
  // Define the properties of the response data here
}

export const uploadFiles = async (files: File[]) => {
  const formData = new FormData()

  files.forEach((file) => {
    formData.append('files', file)
  })
  const { data } = await axios<UploadResponse>({
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
