import FileUploadComponent from '@/components/ui/FileUpload'

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <FileUploadComponent />
      </div>
    </div>
  )
}