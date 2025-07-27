'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface LocationData {
  phone: string
  country: string
  region: string
  city: string
  latitude: number
  longitude: number
  carrier: string
  timezone: string
  lastSeen: string
}

export default function LocationTracker() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isTracking, setIsTracking] = useState(false)
  const [locationData, setLocationData] = useState<LocationData | null>(null)
  const [error, setError] = useState('')

  // Mock location data for demo purposes
  const mockLocationData: LocationData[] = [
    {
      phone: '+1234567890',
      country: 'United States',
      region: 'California',
      city: 'San Francisco',
      latitude: 37.7749,
      longitude: -122.4194,
      carrier: 'Verizon',
      timezone: 'PST (UTC-8)',
      lastSeen: '2 minutes ago'
    },
    {
      phone: '+447911123456',
      country: 'United Kingdom',
      region: 'England',
      city: 'London',
      latitude: 51.5074,
      longitude: -0.1278,
      carrier: 'EE',
      timezone: 'GMT (UTC+0)',
      lastSeen: '5 minutes ago'
    },
    {
      phone: '+33123456789',
      country: 'France',
      region: 'Île-de-France',
      city: 'Paris',
      latitude: 48.8566,
      longitude: 2.3522,
      carrier: 'Orange',
      timezone: 'CET (UTC+1)',
      lastSeen: '1 minute ago'
    }
  ]

  const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/
    return phoneRegex.test(phone.replace(/\s+/g, ''))
  }

  const handleTrack = async () => {
    setError('')
    
    if (!phoneNumber.trim()) {
      setError('Please enter a phone number')
      return
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setError('Please enter a valid phone number (e.g., +1234567890)')
      return
    }

    setIsTracking(true)
    
    // Simulate API call delay
    setTimeout(() => {
      // Find matching mock data or use random data
      const mockData = mockLocationData.find(data => 
        data.phone === phoneNumber || phoneNumber.includes(data.phone.slice(-4))
      ) || {
        phone: phoneNumber,
        country: 'Demo Country',
        region: 'Demo Region',
        city: 'Demo City',
        latitude: 40.7128 + (Math.random() - 0.5) * 10,
        longitude: -74.0060 + (Math.random() - 0.5) * 10,
        carrier: 'Demo Carrier',
        timezone: 'UTC+0',
        lastSeen: 'Just now'
      }
      
      setLocationData(mockData)
      setIsTracking(false)
    }, 2000)
  }

  const handleReset = () => {
    setPhoneNumber('')
    setLocationData(null)
    setError('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Location Tracker
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Advanced phone number location tracking system - Demo Version
          </p>
          <div className="mt-4 px-4 py-2 bg-yellow-600/20 border border-yellow-500/30 rounded-lg inline-block">
            <p className="text-yellow-200 text-sm">
              ⚠️ This is a demonstration app with simulated data for educational purposes only
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Search Section */}
          <Card className="mb-8 bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Track Phone Number</CardTitle>
              <CardDescription className="text-gray-300">
                Enter a phone number to track its location (Demo mode with mock data)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    type="tel"
                    placeholder="Enter phone number (e.g., +1234567890)"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="bg-white/10 border-white/30 text-white placeholder:text-gray-400"
                    disabled={isTracking}
                  />
                  {error && (
                    <p className="text-red-400 text-sm mt-2">{error}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleTrack}
                    disabled={isTracking}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-8"
                  >
                    {isTracking ? 'Tracking...' : 'Track Location'}
                  </Button>
                  {locationData && (
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/10"
                    >
                      Reset
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Loading State */}
          {isTracking && (
            <Card className="mb-8 bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
                  <p className="text-white text-lg">Tracking location...</p>
                  <p className="text-gray-400 text-sm mt-2">Analyzing network data and GPS coordinates</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Results Section */}
          {locationData && !isTracking && (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Location Details */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white text-xl">Location Details</CardTitle>
                  <CardDescription className="text-gray-300">
                    Tracked information for {locationData.phone}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Country</p>
                      <p className="text-white font-semibold">{locationData.country}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Region</p>
                      <p className="text-white font-semibold">{locationData.region}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">City</p>
                      <p className="text-white font-semibold">{locationData.city}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Carrier</p>
                      <p className="text-white font-semibold">{locationData.carrier}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Timezone</p>
                      <p className="text-white font-semibold">{locationData.timezone}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Last Seen</p>
                      <p className="text-green-400 font-semibold">{locationData.lastSeen}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-white/20">
                    <p className="text-gray-400 text-sm mb-2">GPS Coordinates</p>
                    <div className="bg-black/30 rounded-lg p-3">
                      <p className="text-white font-mono text-sm">
                        Lat: {locationData.latitude.toFixed(6)}°
                      </p>
                      <p className="text-white font-mono text-sm">
                        Lng: {locationData.longitude.toFixed(6)}°
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white text-xl">Location Map</CardTitle>
                  <CardDescription className="text-gray-300">
                    Approximate location visualization
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                    {/* Mock map background */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
                        {Array.from({ length: 64 }).map((_, i) => (
                          <div key={i} className="border border-white/10"></div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Location pin */}
                    <div className="relative z-10 text-center">
                      <div className="w-8 h-8 bg-red-500 rounded-full mx-auto mb-2 animate-pulse shadow-lg shadow-red-500/50"></div>
                      <p className="text-white font-semibold text-sm">{locationData.city}</p>
                      <p className="text-gray-300 text-xs">{locationData.country}</p>
                    </div>
                    
                    {/* Radar effect */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 border-2 border-green-400/30 rounded-full animate-ping"></div>
                      <div className="absolute w-24 h-24 border-2 border-green-400/50 rounded-full animate-ping animation-delay-1000"></div>
                      <div className="absolute w-16 h-16 border-2 border-green-400/70 rounded-full animate-ping animation-delay-2000"></div>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <p className="text-gray-400 text-sm">
                      Interactive map integration available in full version
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Demo Numbers */}
          <Card className="mt-8 bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-lg">Demo Phone Numbers</CardTitle>
              <CardDescription className="text-gray-300">
                Try these sample numbers to see the tracking in action
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {mockLocationData.map((data, index) => (
                  <div
                    key={index}
                    className="bg-white/5 rounded-lg p-4 cursor-pointer hover:bg-white/10 transition-colors"
                    onClick={() => setPhoneNumber(data.phone)}
                  >
                    <p className="text-white font-mono text-sm mb-1">{data.phone}</p>
                    <p className="text-gray-400 text-xs">{data.city}, {data.country}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm max-w-2xl mx-auto">
              This is a demonstration application created for educational purposes. 
              Real phone number tracking requires proper authorization and legal compliance. 
              All data shown is simulated and not connected to actual phone numbers or locations.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
