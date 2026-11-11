అన్ని filesలో correct code ఉండాలి.
npm install successfully complete అవ్వాలి.
Backend, Frontend రెండూ run అవ్వాలి.
రెండు terminals openలో ఉంచాలి.
Backend Terminal:

cd ~/25kt23

ls

Step 3: Backend run చేయండి

cd backend
npm install
npm start

Backend running at http://localhost:5000

cd ~/25kt23/frontend
npm install
npm run dev

Local: http://localhost:5173/


cd ~/25kt23/frontend
npm init -y
npm install react react-dom vite @vitejs/plugin-re
  act
frontend/package.json లో ఈ code ఉంచండి:

{
  "name": "blood-donor-frontend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite"
  },
  "dependencies": {
    "@vitejs/plugin-react": "latest",
    "vite": "latest",
    "react": "latest",
    "react-dom": "latest"
  }
}


Step 4: Backend start చేయడం
మొదటి Git Bash terminalలో:
cd ~/25kt23/backend
npm start

Backend running at http://localhost:5000
cd ~/25kt23/frontend
npm run dev

Local: http://localhost:5173/


http://localhost:5173/
