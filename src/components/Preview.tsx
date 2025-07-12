"use client"

import type React from "react"

import { useState } from "react"
import { FaDesktop, FaMobile, FaTablet, FaExpand, FaCompress } from "react-icons/fa"

interface PreviewProps {
  children: React.ReactNode
}

const Preview = ({ children }: PreviewProps) => {
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [isFullscreen, setIsFullscreen] = useState(false)

  const getDeviceStyles = () => {
    switch (device) {
      case "mobile":
        return "w-[375px] h-[667px]"
      case "tablet":
        return "w-[768px] h-[1024px]"
      case "desktop":
      default:
        return "w-full h-full"
    }
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div className={`${isFullscreen ? "fixed inset-0 z-50" : "relative"} bg-[#1a1a1a] p-4`}>
      {/* Preview Controls */}
      <div className="flex justify-between items-center mb-4 bg-[#2f2f2f] rounded-lg p-3">
        <div className="flex items-center space-x-2">
          <span className="text-white text-sm font-medium">Preview:</span>
          <button
            onClick={() => setDevice("desktop")}
            className={`p-2 rounded ${device === "desktop" ? "bg-[#d4a43c] text-white" : "text-gray-400 hover:text-white"}`}
          >
            <FaDesktop />
          </button>
          <button
            onClick={() => setDevice("tablet")}
            className={`p-2 rounded ${device === "tablet" ? "bg-[#d4a43c] text-white" : "text-gray-400 hover:text-white"}`}
          >
            <FaTablet />
          </button>
          <button
            onClick={() => setDevice("mobile")}
            className={`p-2 rounded ${device === "mobile" ? "bg-[#d4a43c] text-white" : "text-gray-400 hover:text-white"}`}
          >
            <FaMobile />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-gray-400 text-sm">
            {device === "desktop" && "1920x1080"}
            {device === "tablet" && "768x1024"}
            {device === "mobile" && "375x667"}
          </span>
          <button onClick={toggleFullscreen} className="p-2 rounded text-gray-400 hover:text-white">
            {isFullscreen ? <FaCompress /> : <FaExpand />}
          </button>
        </div>
      </div>

      {/* Preview Frame */}
      <div className="flex justify-center items-start">
        <div
          className={`${getDeviceStyles()} ${
            device !== "desktop" ? "border-4 border-gray-600 rounded-lg shadow-2xl" : ""
          } bg-white overflow-hidden transition-all duration-300`}
          style={{
            maxHeight: isFullscreen ? "calc(100vh - 100px)" : "80vh",
          }}
        >
          <div className="w-full h-full overflow-auto">{children}</div>
        </div>
      </div>

      {/* Device Info */}
      {device !== "desktop" && (
        <div className="text-center mt-4">
          <span className="text-gray-400 text-sm">
            {device === "mobile" && "iPhone SE / Mobile View"}
            {device === "tablet" && "iPad / Tablet View"}
          </span>
        </div>
      )}
    </div>
  )
}

export default Preview
