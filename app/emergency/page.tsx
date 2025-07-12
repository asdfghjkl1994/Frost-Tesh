"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, AlertTriangle, Clock, MapPin, Zap, Droplets, Flame, Wrench } from 'lucide-react'

export default function EmergencyPage() {
  const [emergencyData, setEmergencyData] = useState({
    type: "",
    description: "",
    address: "",
    phone: "",
    name: "",
  })

  const emergencyTypes = [
    { id: "plumbing", name: "Plumbing Emergency", icon: Droplets, color: "text-blue-600 bg-blue-100" },
    { id: "electrical", name: "Electrical Emergency", icon: Zap, color: "text-yellow-600 bg-yellow-100" },
    { id: "gas", name: "Gas Leak", icon: Flame, color: "text-red-600 bg-red-100" },
    { id: "hvac", name: "HVAC Emergency", icon: Wrench, color: "text-green-600 bg-green-100" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Send emergency notification
      await fetch('/api/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'emergency',
          data: emergencyData
        })
      })
      
      alert("Emergency request submitted! A professional will contact you within 15 minutes.")
      
      // Reset form
      setEmergencyData({
        type: "",
        description: "",
        address: "",
        phone: "",
        name: "",
      })
    } catch (error) {
      console.error('Error submitting emergency request:', error)
      alert("There was an error submitting your request. Please call our emergency hotline directly.")
    }
  }

  const handleEmergencyCall = () => {
    window.location.href = "tel:+15551234567"
  }

  return (
    <div className="min-h-screen bg-red-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Emergency Header */}
        <div className="text-center mb-8">
          <div className="bg-red-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <AlertTriangle className="h-10 w-10 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-red-600 mb-4">Emergency Service</h1>
          <p className="text-xl text-gray-700">Need immediate help? We're available 24/7 for emergency situations.</p>
        </div>

        {/* Emergency Call Button */}
        <div className="text-center mb-8">
          <Button
            onClick={handleEmergencyCall}
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-xl"
          >
            <Phone className="mr-3 h-6 w-6" />
            Call Now: (555) 123-4567
          </Button>
          <p className="text-sm text-gray-600 mt-2">
            <Clock className="inline h-4 w-4 mr-1" />
            Average response time: 15 minutes
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Emergency Request Form */}
          <Card className="shadow-lg border-red-200">
            <CardHeader className="bg-red-50">
              <CardTitle className="text-2xl text-red-700">Submit Emergency Request</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">Emergency Type</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {emergencyTypes.map((type) => {
                      const IconComponent = type.icon
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setEmergencyData({ ...emergencyData, type: type.id })}
                          className={`p-4 border rounded-lg text-left hover:border-red-500 transition-colors ${
                            emergencyData.type === type.id ? "border-red-500 bg-red-50" : "border-gray-300"
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-full ${type.color} mb-3 flex items-center justify-center`}>
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <p className="font-medium text-gray-900">{type.name}</p>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="inline h-4 w-4 mr-2" />
                    Emergency Address
                  </label>
                  <Input
                    required
                    placeholder="Enter the emergency location"
                    value={emergencyData.address}
                    onChange={(e) => setEmergencyData({ ...emergencyData, address: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                    <Input
                      required
                      placeholder="Full name"
                      value={emergencyData.name}
                      onChange={(e) => setEmergencyData({ ...emergencyData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="inline h-4 w-4 mr-2" />
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      required
                      placeholder="(555) 123-4567"
                      value={emergencyData.phone}
                      onChange={(e) => setEmergencyData({ ...emergencyData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Description</label>
                  <Textarea
                    required
                    placeholder="Please describe the emergency situation in detail..."
                    value={emergencyData.description}
                    onChange={(e) => setEmergencyData({ ...emergencyData, description: e.target.value })}
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" size="lg">
                  Submit Emergency Request
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Emergency Information */}
          <div className="space-y-6">
            <Card className="border-yellow-200">
              <CardHeader className="bg-yellow-50">
                <CardTitle className="text-yellow-800 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  When to Call Emergency Services
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <Droplets className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Plumbing:</strong> Major water leaks, burst pipes, sewage backup, no hot water in winter
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Zap className="h-4 w-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Electrical:</strong> Power outages, sparking outlets, burning smells, exposed wires
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Flame className="h-4 w-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Gas:</strong> Gas leaks, carbon monoxide detection, gas appliance malfunctions
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Wrench className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>HVAC:</strong> No heat in winter, no AC in extreme heat, gas furnace issues
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Emergency Response Process</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                      <span className="text-blue-600 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Immediate Response</h4>
                      <p className="text-sm text-gray-600">
                        We receive your emergency request and dispatch the nearest qualified professional
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                      <span className="text-blue-600 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Professional Contact</h4>
                      <p className="text-sm text-gray-600">
                        Our technician will call you within 15 minutes to confirm details
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                      <span className="text-blue-600 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">On-Site Service</h4>
                      <p className="text-sm text-gray-600">
                        Professional arrives on-site typically within 30-60 minutes
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">24/7 Emergency Hotline</h3>
                  <p className="text-2xl font-bold text-green-600">(555) 123-4567</p>
                  <p className="text-sm text-green-700 mt-2">
                    Available 365 days a year • Average response time: 15 minutes
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
