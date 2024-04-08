import { Schema, Types, model } from "mongoose";

export interface INotification {
  message: string;
  type: string;
  from: Types.ObjectId;
  to: Types.ObjectId;
  read: boolean;
}

const notificationSchema = new Schema<INotification>(
  {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["info", "warning", "error"],
    },
    from: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
      autopopulate: true,
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
      autopopulate: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

notificationSchema.plugin(require("mongoose-autopopulate"));

export const Notification = model<INotification>(
  "notification",
  notificationSchema
);
