import mongoose from "mongoose";
import { customerSchema } from "../schemas/customer.schemas";


export default mongoose.model("Customer", customerSchema);
