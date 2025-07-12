const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#2f2f2f] z-50">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-[#d4a43c] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-[#d4a43c] text-lg">กำลังโหลด...</p>
      </div>
    </div>
  )
}

export default LoadingScreen
