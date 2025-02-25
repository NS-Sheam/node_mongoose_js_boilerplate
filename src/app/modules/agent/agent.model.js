import { model, Schema } from "mongoose";
const agentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      default: 100000,
    },
    income: {
      type: Number,
      default: 0,
    },

    cashOutRequests: [
      {
        type: Schema.Types.ObjectId,
        ref: "CashOutRequest",
      },
    ],
    cashInTransactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Agent = model("Agent", agentSchema);
