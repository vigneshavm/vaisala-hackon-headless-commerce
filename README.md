#  E-Commerce Platform – Headless PaaS  

## 📌 Overview  
This project allows **business users** to control their own domain and manage product-related content, while **normal users** can browse, purchase, and track products through a seamless shopping experience.  
It uses **Strapi** as a headless CMS and exposes **REST APIs** for front-end integration.  

---

## 👤 User Roles  

### **1. Business / Admin Users**  
- Manage product details (add, update, delete).  -- call strapi API
- Configure discounts and offers.  -- get from strapi
- Upload banners for promotional campaigns.  
- Manage content via **Strapi (Headless CMS)**.  
- Data served via **REST APIs**.  

### **2. Normal Users**  
- **Sign Up** via social networks (**OAuth**).  
- **Profile Management**:  
  - Locations.  
  - Address details.  
  - Profile picture.  
- **Login / Forgot Password**.  
- Two types of accounts: **Premium User** / **Normal User**.  

---

## 🛍 Product Module  
- List products based on product articles.  
- Filter products by category.  
- Search products using search engine/logic.  

---

## 🛒 Shopping Cart  
- Add/remove products from cart.  

---

## 💰 Discounts  
- Based on **account category** (premium or normal).  
- Based on **product visits** or **cart behavior**.  

---

## 📦 Checkout & Payment Flow  
1. **Address Handling**  
   - Use saved address from profile.  
   - Option to add/edit address during checkout.  

2. **Payment**  
   - Apply coupon codes.  
   - Use wallet balance.  
   - Supported methods:  
     - Credit Card / Debit Card.  
     - UPI.  
     - Net Banking.  
   - OTP verification.  
   - Option to save card details for future use.  
   - Payment notifications: **Email / SMS / WhatsApp**.  

3. **Order Tracking**  
   - Out-of-box (OOB) tracking features.  

---

## ⚙️ CI/CD Pipeline  
- **Version Control**: Git.  
- **Pull Request (PR)** process with:  
  - Linting.  
  - SonarQube analysis.  
  - Test cases & coverage (**70%+**).  
- On success:  
  - Automated build.  
  - Deployment to server.  

**Role-Based Access** with Git & Jenkins.  
**Cloud Hosting**: Azure / AWS.  

---

## 🏗 Architecture  
- **Backend**:  
  - Scalable **microservices** architecture.  
- **Frontend**:  
  - **Micro-frontend** approach.  

[Frontend Admin Panel] 
      ↓
   /api/admin/products   (BFF, JWT protected)
      ↓
[Node.js BFF]
      ↓
  [Strapi REST API] (Server-to-server with API token)

[Frontend Public Product List]
      ↓
   /api/products  (BFF, public)
      ↓
[Node.js BFF → Strapi REST API → Filtered safe response]

[Frontend Admin Preview]
      ↓
   /api/admin/products?preview=true  (BFF, JWT protected)
      ↓
[Node.js BFF → Strapi draft content API]
