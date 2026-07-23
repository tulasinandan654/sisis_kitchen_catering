# EmailJS Setup Guide for Sisi's Kitchen Catering

## 🚀 Quick Setup (5 minutes)

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

### Step 2: Add Email Service
1. In EmailJS dashboard, click "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" (recommended) or your email provider
4. Connect your email account (tulasinandan654@gmail.com)
5. Note down the **Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Template
1. Click "Email Templates" in dashboard
2. Click "Create New Template"
3. Use this template content:

```
Subject: {{subject}} - Sisi's Kitchen Catering

From: {{from_name}}
Email: {{from_email}}
Phone: {{from_phone}}
Form Type: {{form_type}}

---

{{message}}

---
Reply to: {{reply_to}}
```

4. Save the template and note the **Template ID** (e.g., `template_xyz789`)

### Step 4: Get Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key** (e.g., `user_abcdef123456`)

### Step 5: Update Your Website
1. Open `src/lib/emailService.ts`
2. Replace these values:
```typescript
const EMAILJS_SERVICE_ID = 'your_service_id_here';
const EMAILJS_TEMPLATE_ID = 'your_template_id_here';
const EMAILJS_PUBLIC_KEY = 'your_public_key_here';
```

## 📧 Email Template Variables

Your forms will automatically send these variables:
- `{{to_email}}` - Your email (tulasinandan654@gmail.com)
- `{{from_name}}` - Customer's name
- `{{from_email}}` - Customer's email
- `{{from_phone}}` - Customer's phone
- `{{subject}}` - Email subject
- `{{message}}` - Form content
- `{{form_type}}` - Type of form (Booking/Contact/Order)

## 🎯 What Happens Now

### Booking Form
- **Subject**: "New Booking Consultation - [Event Name]"
- **Content**: Customer details, event info, preferences

### Contact Form  
- **Subject**: "Contact Inquiry - [Event Type]"
- **Content**: Customer inquiry and requirements

### Delivery Order Form
- **Subject**: "New Delivery Order - [Package] (₹[Amount])"
- **Content**: Complete order details and delivery info

## 🔧 Testing

1. Fill out any form on your website
2. Check your email (tulasinandan654@gmail.com)
3. You should receive a formatted email within seconds

## 💰 Pricing

- **Free Plan**: 200 emails/month
- **Paid Plans**: Start at $15/month for 1000+ emails

## 🛠️ Troubleshooting

### Common Issues:
1. **Emails not arriving**: Check spam folder
2. **Service errors**: Verify Service ID and Template ID
3. **Template errors**: Ensure all variables are properly formatted

### Support:
- EmailJS Documentation: https://www.emailjs.com/docs/
- Contact EmailJS Support if needed

---

**Your website is now configured to send emails automatically when customers submit forms!**