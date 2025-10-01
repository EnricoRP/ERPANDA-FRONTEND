"use client";
import {
  Image,
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitProvider,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
  Video,
} from "@imagekit/next";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import NextImage from "next/image";
import config from "@/lib/config";

export enum MediaType {
  IMAGE = "image",
  VIDEO = "video",
}

export interface MediaUploadRef {
  handleUpload: () => Promise<string | null>;
  cancelUpload: () => void;
}

interface Props {
  placeholder: string;
  folder: string;
  onFileChange: (filePath: string) => void;
  mediaType: MediaType;
}

const MediaUpload = forwardRef<MediaUploadRef, Props>(
  ({ placeholder, folder, onFileChange, mediaType }, ref) => {
    // state untuk melacak progres upload saat ini
    const [progress, setProgress] = useState(0);
    // buat ref untuk elemen input file agar mudah mengakses filenya
    const fileInputRef = useRef<HTMLInputElement>(null);
    // untuk preview url / pre upload
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    // simpan url untuk menampilkan gambar.
    const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
    // simpan AbortController di dalam ref agar persistensinya terjaga di antara render ulang.
    const abortControllerRef = useRef<AbortController | null>(null);

    const authenticator = async () => {
      try {
        const respone = await fetch(`/api/upload-auth`);
        if (!respone.ok) {
          const errorText = await respone.text();
          throw new Error(
            `Request failed with status ${respone.status}: ${errorText}`
          );
        }
        const data = await respone.json();
        const { signature, expire, token, publicKey } = data;
        return { signature, expire, token, publicKey };
      } catch (error: unknown) {
        console.error("Auth error: ", error);
        throw new Error("Auth request failed");
      }
    };

    const handleFileChange = () => {
      const fileInput = fileInputRef.current;
      if (fileInput?.files && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        setPreviewUrl(URL.createObjectURL(file));
        onFileChange(URL.createObjectURL(file));
      }
    };

    //upload ke imagekit
    const handleUpload = async () => {
      // Akses elemen input file menggunakan ref
      const fileInput = fileInputRef.current;
      if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
        alert("Please select a file to upload");
        return null;
      }

      // Ambil file yang dipilih pengguna
      const file = fileInput.files[0];
      // Dapatkan parameter autentikasi dari server
      let authParams;
      try {
        authParams = await authenticator();
      } catch (authError) {
        console.error("Failed to authenticate for upload:", authError);
        return null;
      }
      // Destrukturisasi parameter autentikasi yang diperlukan
      const { signature, expire, token, publicKey } = authParams;

      // Inisialisasi AbortController baru untuk upload ini
      abortControllerRef.current = new AbortController();

      // Mulai proses upload menggunakan SDK ImageKit
      try {
        const uploadResponse = await upload({
          expire,
          token,
          signature,
          publicKey,
          file,
          fileName: file.name,
          folder: folder,
          onProgress: (event) => {
            setProgress((event.loaded / event.total) * 100);
          },
          abortSignal: abortControllerRef.current!.signal,
        });
        setUploadedUrl(uploadResponse.name!);
        // Reset state dan ref setelah upload selesai
        abortControllerRef.current = null;
        return uploadResponse.url!;
      } catch (error) {
        if (error instanceof ImageKitAbortError) {
          console.info("Upload aborted:", error.reason);
        } else if (error instanceof ImageKitInvalidRequestError) {
          console.error("Invalid request:", error.message);
        } else if (error instanceof ImageKitUploadNetworkError) {
          console.error("Network error:", error.message);
        } else if (error instanceof ImageKitServerError) {
          console.error("Server error:", error.message);
        } else {
          console.error("Upload error:", error);
        }
        return null;
      }
    };

    const cancelUpload = () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort("User canceled upload");
        abortControllerRef.current = null;
        setProgress(0);
      }
    };

    useImperativeHandle(ref, () => ({
      handleUpload,
      cancelUpload,
    }));

    // Tampilan upload, misalnya input file untuk memilih file.
    return (
      <>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={mediaType === MediaType.IMAGE ? "image/*" : "video/*"}
          className="hidden"
        />

        {previewUrl &&
          !uploadedUrl &&
          (mediaType === MediaType.IMAGE ? (
            <NextImage
              src={previewUrl}
              alt="Preview"
              width={500}
              height={500}
              unoptimized
              className="aspect-3/2 object-cover mx-auto rounded shadow"
            />
          ) : (
            <video
              src={previewUrl}
              controls
              width={500}
              height={500}
              className="aspect-3/2 object-cover mx-auto rounded shadow"
            />
          ))}

        {uploadedUrl && (
          <ImageKitProvider
            urlEndpoint={`${config.env.imagekit.urlEndpoint}/${folder}/`}
          >
            {mediaType === MediaType.IMAGE ? (
              <Image
                src={uploadedUrl}
                width={500}
                height={500}
                alt="Uploaded image"
                className="aspect-3/2 object-cover mx-auto rounded shadow"
              />
            ) : (
              <Video
                src={uploadedUrl}
                controls
                className="aspect-video mx-auto rounded shadow"
              />
            )}
          </ImageKitProvider>
        )}

        {progress > 0 && progress !== 100 && (
          <div className="w-full rounded-full bg-green-200">
            <div className="progress" style={{ width: `${progress}%` }}>
              {Math.round(progress)}%
            </div>
          </div>
        )}
        {progress > 0 && progress < 100 ? (
          // tombol cancel saat upload berjalan
          <Button
            variant="cancel"
            onClick={(e) => {
              e.preventDefault();
              cancelUpload();
            }}
            className={cn("upload-btn", "border")}
          >
            <NextImage
              src="/icons/admin/info.svg"
              alt="info-icon"
              width={20}
              height={20}
              className="object-contain"
            />
            <p className="text-base text-white">Cancel Upload</p>
          </Button>
        ) : (
          // tombol upload default
          <Button
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
              fileInputRef.current?.click();
            }}
            className={cn("upload-btn", "bg-light-600 border-gray-100 border")}
          >
            <NextImage
              src="/icons/upload.svg"
              alt="upload-icon"
              width={20}
              height={20}
              className="object-contain"
            />
            <p className="text-base text-slate-500">{placeholder}</p>
          </Button>
        )}
      </>
    );
  }
);

export default MediaUpload;
