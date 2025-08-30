"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Upload, File, CheckCircle, AlertCircle, Clock, X } from "lucide-react"

interface UploadFile {
  id: string
  name: string
  size: number
  type: string
  status: "uploading" | "processing" | "completed" | "error"
  progress: number
  agent?: string
  error?: string
}

export default function UploadPage() {
  const [files, setFiles] = useState<UploadFile[]>([])
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }, [])

  const handleFiles = (fileList: File[]) => {
    const newFiles: UploadFile[] = fileList.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      status: "uploading",
      progress: 0,
      agent: getAgentForFile(file.type),
    }))

    setFiles((prev) => [...prev, ...newFiles])

    // Simulate upload and processing
    newFiles.forEach((file) => {
      simulateUpload(file.id)
    })
  }

  const getAgentForFile = (type: string): string => {
    if (type.startsWith("image/")) return "Aspect.MediaUploader"
    if (type.startsWith("video/")) return "Aspect.MediaUploader"
    if (type.startsWith("audio/")) return "Aspect.MediaUploader"
    if (type.includes("csv") || type.includes("json")) return "Aspect.EcommerceAutomation"
    return "Aspect.Overmind"
  }

  const simulateUpload = (fileId: string) => {
    const interval = setInterval(() => {
      setFiles((prev) =>
        prev.map((file) => {
          if (file.id === fileId) {
            if (file.progress < 100) {
              return { ...file, progress: file.progress + Math.random() * 20 }
            } else if (file.status === "uploading") {
              return { ...file, status: "processing", progress: 0 }
            } else if (file.status === "processing" && file.progress < 100) {
              return { ...file, progress: file.progress + Math.random() * 15 }
            } else {
              clearInterval(interval)
              return { ...file, status: "completed", progress: 100 }
            }
          }
          return file
        }),
      )
    }, 500)
  }

  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "uploading":
      case "processing":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <File className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "uploading":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "processing":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "completed":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "error":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Media Uploader</h1>
          <p className="text-muted-foreground">Upload files to be processed by AspectAI agents</p>
        </div>

        {/* Upload Zone */}
        <Card>
          <CardContent className="p-6">
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Drop files here or click to upload</h3>
              <p className="text-muted-foreground mb-4">Supports images, videos, audio, CSV, and JSON files</p>
              <Button
                onClick={() => document.getElementById("file-input")?.click()}
                className="bg-primary hover:bg-primary/90"
              >
                Choose Files
              </Button>
              <input
                id="file-input"
                type="file"
                multiple
                className="hidden"
                onChange={(e) => e.target.files && handleFiles(Array.from(e.target.files))}
              />
            </div>
          </CardContent>
        </Card>

        {/* File List */}
        {files.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Upload Queue</CardTitle>
              <CardDescription>
                {files.filter((f) => f.status === "completed").length} of {files.length} files processed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {files.map((file) => (
                <div key={file.id} className="flex items-center gap-4 p-4 border rounded-lg bg-card">
                  <div className="flex-shrink-0">{getStatusIcon(file.status)}</div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium truncate">{file.name}</p>
                      <Badge variant="outline" className={getStatusColor(file.status)}>
                        {file.status}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{formatFileSize(file.size)}</span>
                      {file.agent && <span className="text-primary">→ {file.agent}</span>}
                    </div>

                    {(file.status === "uploading" || file.status === "processing") && (
                      <div className="mt-2">
                        <Progress value={file.progress} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">
                          {file.status === "uploading" ? "Uploading" : "Processing"} - {Math.round(file.progress)}%
                        </p>
                      </div>
                    )}

                    {file.error && <p className="text-sm text-red-500 mt-1">{file.error}</p>}
                  </div>

                  <Button variant="ghost" size="sm" onClick={() => removeFile(file.id)} className="flex-shrink-0">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Agent Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Media Processing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">Active</span>
              </div>
              <p className="text-2xl font-bold mt-2">
                {files.filter((f) => f.agent === "Aspect.MediaUploader").length}
              </p>
              <p className="text-xs text-muted-foreground">files queued</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Ecommerce Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">Ready</span>
              </div>
              <p className="text-2xl font-bold mt-2">
                {files.filter((f) => f.agent === "Aspect.EcommerceAutomation").length}
              </p>
              <p className="text-xs text-muted-foreground">files queued</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">General Processing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">Orchestrating</span>
              </div>
              <p className="text-2xl font-bold mt-2">{files.filter((f) => f.agent === "Aspect.Overmind").length}</p>
              <p className="text-xs text-muted-foreground">files queued</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
