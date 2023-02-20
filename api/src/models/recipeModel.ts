import mongoose from "mongoose";

const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ingredients: {
      type: Number,
      required: true,
    },
    steps: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: false,
    },
    tags: [{ label: String }],
    servings: {
      type: Number,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    private: {
      type: Boolean,
      required: true,
    },
    rating: [
      {
        user_id: String,
        rating: Number,
      },
    ],
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Recipe = mongoose.model("Recipe", recipeSchema);
