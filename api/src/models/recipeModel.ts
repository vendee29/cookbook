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
      required: false,
    },
    ingredients: {
      type: [{ ingredient: String, amount: String }],
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
    tags: { type: [{ label: String }], required: false },
    servings: {
      type: Number,
      required: false,
    },
    time: {
      type: String,
      required: false,
    },
    private: {
      type: Boolean,
      required: false,
      default: false,
    },
    rating: {
      type: [
        {
          user_id: String,
          rating: Number,
        },
      ],
      required: false,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Recipe = mongoose.model("Recipe", recipeSchema);
