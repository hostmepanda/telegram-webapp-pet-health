import mongoose from "mongoose";

export const DiaryModelSchema = new mongoose.Schema({
  telegramChatId: String,
  sharedWith: [{
    telegramId: String,
    userName: String,
    firstName: String,
    lastName: String,
    checkCode: Number,
  }],
  petName: { type: String, default: 'Waffle' },
  records: [{
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
    recordDate: { type: Date, default: new Date() },
    note: String,
    recordType: {
      symbol: String,
      caption: String,
    },
  }],
  recordTypes: [{
    symbol: String,
    caption: String,
  }],
}, {
  timestamps: true,
})

export const Diaries =  mongoose.model('Diaries', DiaryModelSchema);
