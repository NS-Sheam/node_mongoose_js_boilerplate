import QueryBuilder from "../../helpers/QueryBuilder.js";
import { CashInRequest } from "../cashIn/cashIn.model.js";
import { CashOutRequest } from "../cashOut/cashOut.model.js";

import { Agent } from "./agent.model.js";

const getAllAgents = async (query) => {
  const resultQuery = new QueryBuilder(
    Agent.find().populate("user").populate("cashOutRequests cashInTransactions"),
    query
  )
    .filter()
    .sort()
    .fields()
    .paginate();

  const result = await resultQuery.modelQuery;
  const meta = await resultQuery.countTotal();

  return { result, meta };
};

export const AgentService = { getAllAgents };
