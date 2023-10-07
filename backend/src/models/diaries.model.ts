import mongoose from "mongoose";

const DiaryModelSchema = new mongoose.Schema({
  telegramChatId: String,
  petName: { type: String, default: 'Not provided' },
  records: [{
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
    recordDate: { type: Date, default: new Date() },
    note: String,
  }],
  recordTypes: [{
    symbol: String,
    caption: String,
  }],
}, {
  timestamps: true,
})

export const Diaries =  mongoose.model('Diaries', DiaryModelSchema);
