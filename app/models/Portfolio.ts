import mongoose from 'mongoose';

const PortfolioSchema = new mongoose.Schema(
  {
    id: { 
      type: String, 
      required: true, 
      unique: true 
    },
    title: { 
      type: String, 
      required: true 
    },
    category: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String, 
      required: true 
    },
    tech: { 
      type: [String], 
      required: true 
    },
    icon: { 
      type: String, 
      default: 'faLayerGroup' 
    },
    colorKey: { 
      type: String, 
      enum: ['purple', 'cyan', 'blue', 'emerald'], 
      default: 'purple' 
    },
    stats: { 
      type: String, 
      required: true 
    },
    image: { 
      type: String, 
      required: true 
    },
    imageAlt: { 
      type: String, 
      required: true 
    },
    github: { 
      type: String, 
      default: '' 
    },
    liveUrl: { 
      type: String, 
      default: '' 
    },
  },
  {
    timestamps: true, // createdAt, updatedAt automatically যোগ হবে
  }
);

// মডেলটি ইতিমধ্যে exists কিনা চেক করুন (Next.js hot reload এর জন্য)
export default mongoose.models.Portfolio || mongoose.model('Portfolio', PortfolioSchema);