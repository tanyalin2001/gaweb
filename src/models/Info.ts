import mongoose from 'mongoose'

const InfoSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    coverUrl: String,
    tags: [String],
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Info || mongoose.model('Info', InfoSchema)
