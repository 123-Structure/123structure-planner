import mongoose from "mongoose";
import { customerSchema } from "../schemas/customer.schema";

export default mongoose.model("Customer", customerSchema);
