#  CertifyNow - Digital Certificate Management Platform

**CertifyNow** is a secure and user-friendly web application built to create, manage, and verify digital certificates online. This project is built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and offers a smooth experience for learners, educators, and institutions.

---

## 🚀 Features

- 🔐 **Secure Certificate Generation**
- 🔎 **Real-Time Certificate Verification**
- 📄 **Beautiful, Responsive UI**
- 📊 **Live Stats on Issued Certificates**
- 🌐 **Public Verification by Unique Certificate ID**
- ☁️ **Built with MERN Stack**

---

## 📦 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/khalil-dev/certifynow.git
cd certifynow

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install

# Create .env file in server/ directory and add MongoDB URI & port
MONGO_URI=your_mongodb_uri
PORT=5000

# Run backend
npm run dev

# Run frontend
cd ../client
npm run dev
````

---

## 🌐 Routes & Pages

* `/` → Home
* `/verify` → Verify Certificate by ID
* `/create` → Create a new certificate
* `/about` → About the platform
* `/view/:id` → View individual certificate

---

## 📄 License

This project is open-source and free to use for educational and portfolio purposes.





