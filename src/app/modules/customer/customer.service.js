import QueryBuilder from "../../helpers/QueryBuilder.js";
import { Transaction } from "../transaction/transaction.model.js";
import { Customer } from "./customer.model.js";

const getAllCustomers = async (query) => {
  const resultQuery = new QueryBuilder(Customer.find().populate("user").populate("transactions"), query)
    .filter()
    .sort()
    .fields()
    .paginate();

  const result = await resultQuery.modelQuery;
  const meta = await resultQuery.countTotal();

  return { result, meta };
};

export const CustomerService = { getAllCustomers };
