# 🌱 GreenTech - AI-Powered Waste-to-Energy Platform

Transform waste into sustainable energy using cutting-edge AI technology. GreenTech combines real-time monitoring, predictive analytics, and community engagement to optimize waste processing and energy generation.

![GreenTech Platform](https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=400&fit=crop)

## 🚀 Live Demo

**URL**: https://wasteai-nexus.vercel.app/

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [ML Model Integration](#ml-model-integration)
- [API Integration Guide](#api-integration-guide)
- [Development Setup](#development-setup)
- [Deployment](#deployment)
- [Contributing](#contributing)

## 🎯 Overview

GreenTech is a comprehensive platform that leverages artificial intelligence to optimize waste-to-energy conversion processes. The platform provides:

- **Real-time Analytics**: Monitor waste processing efficiency and energy output
- **AI-Powered Predictions**: Forecast energy generation and optimize operations
- **Interactive Mapping**: Locate waste collection points and processing facilities
- **Community Engagement**: FAQ system and feedback collection
- **Intelligent Chat**: AI assistant for operational queries and insights

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible component library
- **Recharts** - Data visualization library
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icon library

### Backend & Database
- **Supabase** - Backend-as-a-Service platform
  - PostgreSQL database with Row Level Security
  - Real-time subscriptions
  - Edge Functions for serverless computing
  - Authentication & authorization
  - File storage

### AI/ML Integration
- **OpenAI API** - GPT models for intelligent chat
- **Python ML Models** - Custom waste processing predictions
- **Edge Functions** - Serverless API endpoints
- **Real-time Data Processing** - Live analytics and monitoring

## ✨ Features

### 🏠 Landing Page
- Hero section with animated elements
- Key statistics and metrics
- Call-to-action buttons
- Responsive design

### 📊 Analytics Dashboard
- Real-time waste processing data
- Energy generation metrics
- Efficiency trends visualization
- Environmental impact tracking

### 🗺️ Interactive Map
- Waste collection point locations
- Facility status monitoring
- Distance calculations
- Navigation integration

### 🤖 AI Chat Assistant
- Natural language queries
- Voice input support
- Text-to-speech responses
- Context-aware responses

### 📈 Insights & Reporting
- Weekly and monthly trends
- Waste composition analysis
- Performance metrics
- Environmental impact reports

## 🧠 ML Model Integration

### Overview
This section guides you through integrating your Python ML model repository with the GreenTech platform.

### Prerequisites
- Python ML model repository (separate repo)
- Trained model files (.pkl, .joblib, or .h5)
- Model dependencies and requirements
- API endpoint specifications

### Step 1: Model Repository Structure
```
your-ml-model-repo/
├── models/
│   ├── waste_prediction_model.pkl
│   ├── energy_optimization_model.pkl
│   └── efficiency_classifier.pkl
├── src/
│   ├── preprocessing/
│   ├── training/
│   └── inference/
├── api/
│   ├── app.py
│   ├── routes/
│   └── utils/
├── requirements.txt
├── Dockerfile
└── README.md
```

### Step 2: Create ML API Endpoints

#### Option A: Flask/FastAPI Server
```python
# api/app.py
from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load trained models
waste_model = joblib.load('../models/waste_prediction_model.pkl')
energy_model = joblib.load('../models/energy_optimization_model.pkl')

@app.route('/predict/waste-processing', methods=['POST'])
def predict_waste_processing():
    data = request.json
    # Preprocess input data
    features = np.array([data['waste_amount'], data['waste_type'], data['temperature']])
    prediction = waste_model.predict([features])
    return jsonify({
        'predicted_energy': float(prediction[0]),
        'confidence': 0.95,
        'processing_time': 45
    })

@app.route('/optimize/energy-output', methods=['POST'])
def optimize_energy():
    data = request.json
    # Run optimization algorithm
    optimal_params = energy_model.predict([data['current_params']])
    return jsonify({
        'optimal_temperature': float(optimal_params[0]),
        'optimal_pressure': float(optimal_params[1]),
        'expected_efficiency': 0.87
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

#### Option B: Supabase Edge Function (Recommended)
```typescript
// supabase/functions/ml-predictions/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { model_type, input_data } = await req.json()
    
    // Call your ML model API
    const ML_API_URL = Deno.env.get('ML_API_URL')
    const response = await fetch(`${ML_API_URL}/predict/${model_type}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input_data)
    })
    
    const prediction = await response.json()
    
    return new Response(JSON.stringify(prediction), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
```

### Step 3: Deploy ML Model

#### Option A: Cloud Deployment (Recommended)
```bash
# Deploy to Railway/Render/Heroku
git clone your-ml-model-repo
cd your-ml-model-repo

# Create Dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "api/app.py"]

# Deploy
railway deploy  # or render deploy, heroku deploy
```

#### Option B: Local Development
```bash
# Run ML API locally
git clone your-ml-model-repo
cd your-ml-model-repo
pip install -r requirements.txt
python api/app.py  # Runs on http://localhost:5000
```

### Step 4: Environment Configuration

Add ML API credentials to Supabase Edge Function secrets:
```bash
# In Supabase Dashboard > Edge Functions > Secrets
ML_API_URL=https://your-ml-api.railway.app
ML_API_KEY=your-secret-api-key
```

### Step 5: Frontend Integration

The React components are already scaffolded with placeholder API calls. Update the API endpoints:

```typescript
// src/services/mlApi.ts
import { supabase } from '@/integrations/supabase/client'

export const mlApi = {
  predictWasteProcessing: async (data: WasteInputData) => {
    const { data: result, error } = await supabase.functions.invoke('ml-predictions', {
      body: { model_type: 'waste-processing', input_data: data }
    })
    return { result, error }
  },
  
  optimizeEnergyOutput: async (params: EnergyParams) => {
    const { data: result, error } = await supabase.functions.invoke('ml-predictions', {
      body: { model_type: 'energy-optimization', input_data: params }
    })
    return { result, error }
  }
}
```

## 🔌 API Integration Guide

### External APIs

#### 1. Weather API (for environmental factors)
```typescript
// Add to Supabase secrets
WEATHER_API_KEY=your-openweather-api-key

// Edge function call
const weather = await fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`
)
```

#### 2. Maps API (for facility locations)
```typescript
// Add to Supabase secrets  
MAPBOX_ACCESS_TOKEN=your-mapbox-token

// Component usage
import 'mapbox-gl/dist/mapbox-gl.css'
mapboxgl.accessToken = mapboxToken
```

#### 3. OpenAI API (for chat assistant)
```typescript
// Add to Supabase secrets
OPENAI_API_KEY=your-openai-api-key

// Edge function for chat
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${openaiKey}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'gpt-4',
    messages: [{ role: 'user', content: userQuery }]
  })
})
```

### Setting Up API Keys

1. **In Supabase Dashboard**:
   - Go to Edge Functions > Secrets
   - Add each API key as a secret
   - Use in Edge Functions with `Deno.env.get('SECRET_NAME')`

2. **For Frontend-Only APIs**:
   - Create environment variables in components
   - Use for public/client-side API keys only

## 🚀 Development Setup

### Prerequisites
- Node.js 18+ and npm
- Git
- Supabase account
- API keys for external services

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/greentech-platform
   cd greentech-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new Supabase project
   - Copy your project URL and anon key
   - The project is pre-configured with the connection

4. **Configure API Keys**
   - Add secrets in Supabase Dashboard > Edge Functions > Secrets
   - Required secrets:
     - `OPENAI_API_KEY`
     - `ML_API_URL` 
     - `ML_API_KEY`
     - `WEATHER_API_KEY`
     - `MAPBOX_ACCESS_TOKEN`

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   ```
   http://localhost:5173
   ```

### Development Workflow

1. **ML Model Updates**
   ```bash
   # Update ML model repo
   cd your-ml-model-repo
   git pull origin main
   
   # Redeploy ML API
   railway deploy  # or your deployment method
   
   # Test integration
   npm run test:ml-integration
   ```

2. **Frontend Development**
   ```bash
   # Create new feature branch
   git checkout -b feature/new-analytics-chart
   
   # Make changes
   npm run dev  # Live reload
   
   # Test changes
   npm run build
   npm run preview
   ```

3. **Database Changes**
   ```bash
   # Use Supabase migration tool in Lovable
   # Or use Supabase CLI
   supabase db reset
   supabase db push
   ```

## 📊 Component Architecture

### ML Integration Components

#### 1. Prediction Dashboard (`src/components/PredictionDashboard.tsx`)
```typescript
interface PredictionData {
  wasteAmount: number
  wasteType: string
  predictedEnergy: number
  confidence: number
  timestamp: Date
}

// Features:
// - Real-time waste processing predictions
// - Energy output forecasting
// - Confidence intervals
// - Historical comparison
```

#### 2. Optimization Panel (`src/components/OptimizationPanel.tsx`)
```typescript
interface OptimizationParams {
  temperature: number
  pressure: number
  flowRate: number
  wasteComposition: WasteComposition
}

// Features:
// - Parameter adjustment controls
// - Real-time optimization suggestions
// - Efficiency metrics
// - Performance tracking
```

#### 3. ML Model Monitor (`src/components/MLModelMonitor.tsx`)
```typescript
interface ModelMetrics {
  accuracy: number
  latency: number
  predictions_per_hour: number
  model_version: string
  last_updated: Date
}

// Features:
// - Model performance monitoring
// - Accuracy tracking
// - Version management
// - Health status indicators
```

### Data Flow Architecture

```
User Input → React Component → Supabase Edge Function → ML API → Python Model
                ↓                        ↓                    ↓
User Interface ← State Management ← API Response ← JSON Response ← Prediction
```

## 🔒 Security & Best Practices

### API Security
- All API keys stored in Supabase Edge Function secrets
- CORS headers properly configured
- Rate limiting implemented
- Input validation on all endpoints

### ML Model Security
- Model endpoints protected with API keys
- Input sanitization and validation
- Output filtering for sensitive data
- Model versioning and rollback capability

### Database Security
- Row Level Security (RLS) enabled
- User authentication required
- Data encryption at rest
- Audit logging enabled

## 🚀 Deployment

### Frontend Deployment
1. **Using Lovable (Recommended)**
   - Click "Publish" in Lovable interface
   - Automatic deployment to Lovable's CDN
   - Custom domain available with paid plans

2. **Manual Deployment**
   ```bash
   npm run build
   # Deploy dist/ folder to Vercel, Netlify, or Cloudflare Pages
   ```

### Backend Deployment
- Supabase Edge Functions deploy automatically
- Database migrations managed through Supabase
- Secrets configured in Supabase Dashboard

### ML Model Deployment
1. **Containerized Deployment**
   ```bash
   docker build -t greentech-ml-api .
   docker run -p 5000:5000 greentech-ml-api
   ```

2. **Cloud Platform Deployment**
   - Railway: `railway deploy`
   - Render: Connect GitHub repo
   - Heroku: `git push heroku main`
   - Google Cloud Run: `gcloud run deploy`

## 📈 Monitoring & Analytics

### Application Monitoring
- Supabase Dashboard for database metrics
- Edge Function logs and performance
- Real-time error tracking
- User analytics and engagement

### ML Model Monitoring
- Prediction accuracy tracking
- Model drift detection
- Performance degradation alerts
- A/B testing for model versions

## 🤝 Contributing

### Getting Started
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### ML Model Contributions
1. Fork the ML model repository
2. Improve model accuracy or add new features
3. Update API endpoints accordingly
4. Test integration with frontend
5. Submit pull request with performance metrics

### Code Style
- TypeScript for all new code
- ESLint and Prettier for formatting
- Component composition over inheritance
- Functional components with hooks

## 🆘 Troubleshooting

### Common Issues

#### ML Model Integration
- **Model API not responding**: Check deployment status and logs
- **Prediction errors**: Validate input data format and types
- **Slow response times**: Implement caching and optimize model

#### Frontend Issues
- **API calls failing**: Check CORS configuration and API keys
- **Components not rendering**: Verify imports and dependencies
- **State management issues**: Check React hooks and context usage

#### Database Issues
- **Connection errors**: Verify Supabase configuration
- **Permission denied**: Check RLS policies and authentication
- **Migration failures**: Review SQL syntax and dependencies

### Getting Help
- Create an issue in this repository
- Contact the development team

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Supabase** - For the powerful backend infrastructure
- **OpenAI** - For the AI capabilities
- **shadcn/ui** - For the beautiful component library
- **Tailwind CSS** - For the utility-first styling

---
**Made with ❤️ by Mwaki Denis**
**Supporting**
##[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-%F0%9F%8D%B5-yellow?style=plastic)](https://wa.me/254798750585)