/* eslint-disable @next/next/no-img-element */
'use client'

import Image from 'next/image'

import { ChangeEvent, useState } from 'react'

export function MediaPicker() {
  const [preview, setPreview] = useState<String | null>(null)
  const [isImage, setIsImage] = useState<Boolean>(true)
  function onFIleSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files) {
      return
    }

    const ImageRegex = /^(image)\/[a-zA-Z]+/

    if (ImageRegex.test(files[0].type.toString())) {
      setIsImage(true)
    } else {
      setIsImage(false)
    }

    const previewURL = URL.createObjectURL(files[0])
    setPreview(previewURL)
  }
  return (
    <>
      <input
        onChange={onFIleSelected}
        type="file"
        name="coverURL"
        id="media"
        accept="image/*, video/*"
        className="invisible h-0 w-0"
      />
      {preview && (
        <>
          {isImage ? (
            <Image
              src={preview}
              alt=""
              width={592}
              height={280}
              className="aspect-video w-full rounded-lg object-cover"
            />
          ) : (
            <video
              src={preview}
              alt=""
              width={592}
              height={280}
              controls
              className="aspect-video w-full rounded-lg object-cover"
            />
          )}
        </>
      )}
    </>
  )
}
