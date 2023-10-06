import mongoose from "mongoose";

const UserModelSchema = new mongoose.Schema({
  telegramChatId: String,
  diaryIds: [String],
}, {
  timestamps: true,
})

export const Users =  mongoose.model('Users', UserModelSchema);
