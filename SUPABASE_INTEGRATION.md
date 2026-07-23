# Supabase Integration Guide for The Boat House Catering

## 🎯 Quick Setup: Add Database to Your Current Website

### **Step 1: Create Supabase Account**
1. Go to [supabase.com](https://supabase.com)
2. Sign up with GitHub or email
3. Create a new project
4. Note your project URL and API key

### **Step 2: Install Supabase**
```bash
npm install @supabase/supabase-js
```

### **Step 3: Create Database Tables**

#### **Bookings Table**
```sql
-- Go to Supabase Dashboard > SQL Editor
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  event_name TEXT NOT NULL,
  event_date DATE NOT NULL,
  event_time TIME NOT NULL,
  number_of_persons INTEGER NOT NULL,
  food_preference TEXT NOT NULL,
  locality TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policy for admin access
CREATE POLICY "Admin can view all bookings" ON bookings
  FOR ALL USING (auth.role() = 'authenticated');
```

#### **Media Table**
```sql
CREATE TABLE media (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  filename TEXT NOT NULL,
  url TEXT NOT NULL,
  category TEXT NOT NULL,
  type TEXT NOT NULL, -- 'image' or 'video'
  uploaded_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Anyone can view media" ON media
  FOR SELECT USING (true);

-- Create policy for admin write access
CREATE POLICY "Admin can manage media" ON media
  FOR ALL USING (auth.role() = 'authenticated');
```

### **Step 4: Setup Environment Variables**
Create `.env.local` file:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### **Step 5: Create Supabase Client**
```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
```

## 🔄 Update Your Components

### **BookingForm.tsx - Save to Database**
```typescript
import { supabase } from '../lib/supabase';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    // Save to Supabase
    const { data, error } = await supabase
      .from('bookings')
      .insert([{
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        event_name: formData.eventName,
        event_date: formData.eventDate,
        event_time: formData.eventTime,
        number_of_persons: parseInt(formData.numberOfPersons),
        food_preference: formData.foodPreference,
        locality: formData.locality,
        message: formData.message
      }]);

    if (error) throw error;

    // Send email notification
    await sendEmailNotification(formData);
    
    setIsSubmitted(true);
    // Reset form...
  } catch (error) {
    console.error('Error saving booking:', error);
    alert('Error submitting booking. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};
```

### **Gallery.tsx - Load from Database**
```typescript
import { supabase } from '../lib/supabase';

const Gallery = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    try {
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .order('uploaded_at', { ascending: false });

      if (error) throw error;
      setMediaItems(data || []);
    } catch (error) {
      console.error('Error loading media:', error);
    }
  };

  // Rest of component...
};
```

### **AdminPanel.tsx - Upload to Supabase Storage**
```typescript
import { supabase } from '../lib/supabase';

const uploadFile = async (file: File) => {
  try {
    // Upload file to Supabase Storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `media/${fileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('media')
      .getPublicUrl(filePath);

    // Save metadata to database
    const { data, error } = await supabase
      .from('media')
      .insert([{
        filename: file.name,
        url: urlData.publicUrl,
        category: selectedCategory,
        type: file.type.startsWith('video/') ? 'video' : 'image'
      }]);

    if (error) throw error;

    // Refresh media list
    loadMedia();
  } catch (error) {
    console.error('Error uploading file:', error);
    alert('Error uploading file. Please try again.');
  }
};
```

## 📧 Email Notifications with Supabase Edge Functions

### **Create Edge Function**
```typescript
// supabase/functions/send-booking-email/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const { booking } = await req.json();

  // Send email using your preferred service
  // (SendGrid, Mailgun, etc.)
  
  const emailContent = `
    New booking received:
    Name: ${booking.name}
    Phone: ${booking.phone}
    Event: ${booking.event_name}
    Date: ${booking.event_date}
    Guests: ${booking.number_of_persons}
  `;

  // Send email logic here...

  return new Response(
    JSON.stringify({ success: true }),
    { headers: { "Content-Type": "application/json" } }
  );
});
```

## 🔐 Authentication for Admin

### **Setup Admin Authentication**
```typescript
// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  return { user, loading, signIn, signOut };
};
```

## 📊 Admin Dashboard

### **Bookings Management**
```typescript
// src/components/AdminDashboard.tsx
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
    
    // Real-time updates
    const subscription = supabase
      .channel('bookings')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'bookings' },
        () => loadBookings()
      )
      .subscribe();

    return () => subscription.unsubscribe();
  }, []);

  const loadBookings = async () => {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading bookings:', error);
    } else {
      setBookings(data || []);
    }
  };

  const updateBookingStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error('Error updating booking:', error);
    } else {
      loadBookings();
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Booking Management</h2>
      <div className="bookings-list">
        {bookings.map(booking => (
          <div key={booking.id} className="booking-card">
            <h3>{booking.name}</h3>
            <p>Event: {booking.event_name}</p>
            <p>Date: {booking.event_date}</p>
            <p>Guests: {booking.number_of_persons}</p>
            <p>Status: {booking.status}</p>
            
            <div className="actions">
              <button onClick={() => updateBookingStatus(booking.id, 'confirmed')}>
                Confirm
              </button>
              <button onClick={() => updateBookingStatus(booking.id, 'cancelled')}>
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
```

## 🚀 Deployment with Dynamic Features

### **Environment Variables for Production**
```env
# Add to Netlify environment variables
VITE_SUPABASE_URL=your_production_supabase_url
VITE_SUPABASE_ANON_KEY=your_production_supabase_key
```

### **Build and Deploy**
```bash
# Build with environment variables
npm run build

# Deploy to Netlify
# Your environment variables will be automatically included
```

## 📈 Benefits of This Upgrade

### **For You (Admin)**
- ✅ Real-time booking notifications
- ✅ Centralized booking management
- ✅ Cloud-based media storage
- ✅ Automatic backups
- ✅ Analytics and reporting

### **For Your Customers**
- ✅ Instant booking confirmations
- ✅ Better gallery experience
- ✅ Faster website loading
- ✅ Mobile-optimized interface

### **Business Benefits**
- ✅ Professional image
- ✅ Reduced manual work
- ✅ Better customer service
- ✅ Scalable solution
- ✅ Data-driven decisions

## 💰 Cost Breakdown

### **Supabase (Database + Storage + Auth)**
- Free tier: 500MB database, 1GB storage
- Pro tier: $25/month for more resources

### **Total Monthly Cost**
- **Free tier**: $0/month (perfect for starting)
- **Paid tier**: $25/month (when you grow)

This is much more affordable than building a custom backend!

## 🎯 Implementation Timeline

### **Week 1: Database Setup**
- Create Supabase account
- Set up tables
- Update booking form

### **Week 2: Media Management**
- Set up Supabase Storage
- Update admin panel
- Migrate existing media

### **Week 3: Authentication**
- Implement admin login
- Secure admin features
- Test security

### **Week 4: Polish & Deploy**
- Add email notifications
- Test all features
- Deploy to production

Ready to make your website dynamic? Let's start with Supabase integration!