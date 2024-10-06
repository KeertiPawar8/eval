const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ISBN: { type: String, required: true, unique: true },
  summary: { type: String },
  publicationDate: { type: Date },
  genres: [String],
  copiesAvailable: { type: Number, default: 1 },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
  borrowedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
