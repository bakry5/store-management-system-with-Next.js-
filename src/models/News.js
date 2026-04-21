import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for the news'],
    trim: true,
    maxlength: [150, 'Title cannot be more than 150 characters']

  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


export default mongoose.models.News || mongoose.model('News', NewsSchema);