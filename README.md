# 🎭 Face Expression Detection (React + MediaPipe)

This project is a **real-time face expression detection web app** built using **React (Vite)** and **MediaPipe Face Landmarker**. It detects facial expressions like smiling, surprised, angry, sleepy, and neutral using your webcam.

---

## 🚀 Features

- 📷 Real-time webcam face detection  
- 😊 Detects multiple expressions:
  - Smiling  
  - Surprised  
  - Angry  
  - Sleepy  
  - Neutral  
- ⚡ Fast performance using MediaPipe  
- 🎯 Lightweight React + Vite setup  

---

## 🛠️ Tech Stack

- React (Vite)  
- MediaPipe Tasks Vision  
- JavaScript (ES6+)  

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/face-expression-detection.git

# Navigate to project folder
cd face-expression-detection

# Install dependencies
npm install

# Run the project
npm run dev
```

---

## 📷 Usage

1. Open the app in your browser  
2. Click on **Start Camera**  
3. Allow camera permission  
4. See your live facial expression detection  

---

## ⚙️ How It Works

- Uses **MediaPipe Face Landmarker** to track facial landmarks  
- Extracts **blendshape scores** like:
  - `mouthSmile`  
  - `jawOpen`  
  - `eyeBlink`  
- Applies logic thresholds to classify expressions  

---

## 📁 Project Structure

```
src/
├── components/
│   └── FaceExpression.jsx
├── App.jsx
└── main.jsx
```

---

## ⚠️ Requirements

- Modern browser (Chrome recommended)  
- Webcam access enabled  

---

## 🧪 Future Improvements

- 🎯 Add face bounding box  
- 📊 Expression confidence graph  
- 📱 Mobile optimization  
- 🤖 Improve ML accuracy  

---

## 🙌 Acknowledgements

- MediaPipe by Google  
- React & Vite community  

---

## 📄 License

This project is open-source and free to use.