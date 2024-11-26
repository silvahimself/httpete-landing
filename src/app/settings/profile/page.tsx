'use client'

import { useState } from 'react'
import { User, Mail, Phone, MapPin, Briefcase, Calendar } from 'lucide-react'
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Textarea } from "~/components/ui/textarea"
import Achievements from '~/components/Achievements'

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    company: 'Acme Inc.',
    joinDate: '2023-01-01',
    bio: 'Passionate developer and API enthusiast.'
  })

  const [isEditing, setIsEditing] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUser(prevUser => ({ ...prevUser, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Updated user data:', user)
    setIsEditing(false)
  }

  return (
    <div className='flex flex-wrap w-fit'>

    
    <div className="bg-gray-800 m-8 max-h-fit rounded-lg p-8">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Names</Label>
            <div className="flex items-center">
              <User className="w-5 h-5 text-gray-500 mr-2" />
              <Input
                id="name"
                name="name"
                value={user.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="bg-gray-700"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-gray-500 mr-2" />
              <Input
                id="email"
                name="email"
                type="email"
                value={user.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="bg-gray-700"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <div className="flex items-center">
              <Phone className="w-5 h-5 text-gray-500 mr-2" />
              <Input
                id="phone"
                name="phone"
                value={user.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="bg-gray-700"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-gray-500 mr-2" />
              <Input
                id="location"
                name="location"
                value={user.location}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="bg-gray-700"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <div className="flex items-center">
              <Briefcase className="w-5 h-5 text-gray-500 mr-2" />
              <Input
                id="company"
                name="company"
                value={user.company}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="bg-gray-700"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="joinDate">Join Date</Label>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-gray-500 mr-2" />
              <Input
                id="joinDate"
                name="joinDate"
                type="date"
                value={user.joinDate}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="bg-gray-700"
              />
            </div>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="bio">Bio</Label
>
            <Textarea
              id="bio"
              name="bio"
              value={user.bio}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="bg-gray-700 h-32"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          {isEditing ? (
            <>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            </>
          ) : (
            <Button type="button" onClick={() => setIsEditing(true)}>Edit Profile</Button>
          )}
        </div>
      </form>
    </div>

          <div>
            <Achievements expanded={true}/>
          </div>

    </div>
  )
}

