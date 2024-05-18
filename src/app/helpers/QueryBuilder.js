class QueryBuilder {
  constructor(modelQuery, query) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  //   search query
  search(searchableFields) {
    const { searchTerm } = this.query;

    if (searchTerm) {
      const searchRegex = new RegExp(searchTerm, "i");
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field) => ({ [field]: searchRegex })),
      });
    }

    return this;
  }

  // range query
  range(searchableFields) {
    const startRangeField = searchableFields?.startDateField || "createdAt";
    const endRangeField = searchableFields?.endDateField || "createdAt";
    const startRange = this?.query?.startRange;
    const endRange = this?.query?.endRange;

    if (startRange && endRange) {
      this.modelQuery = this.modelQuery.find({
        [startRangeField]: { $gte: startRange },
        [endRangeField]: { $lte: endRange },
      });
    } else if (startRange) {
      this.modelQuery = this.modelQuery.find({
        [startRangeField]: { $gte: startRange },
      });
    } else if (endRange) {
      this.modelQuery = this.modelQuery.find({
        [endRangeField]: { $lte: endRange },
      });
    }
    return this;
  }

  //   filter query
  filter() {
    const queryObject = { ...this.query };
    // remove fields from query
    const excludeFields = ["searchTerm", "sort", "limit", "page", "fields", "startRange", "endRange"];

    excludeFields.forEach((el) => delete queryObject[el]);

    this.modelQuery = this.modelQuery.find(queryObject);
    return this;
  }

  //   sort query
  sort() {
    const sort = this?.query?.sort?.split(",").join(" ") || "-createdAt";
    this.modelQuery = this.modelQuery.sort(sort);
    return this;
  }

  //   limit query
  limit() {
    const limit = Number(this?.query?.limit) || 10;
    this.modelQuery = this.modelQuery.limit(limit);
    return this;
  }

  // pagination query
  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  // field limiting
  fields() {
    const fields = this?.query?.fields?.split(",").join(" ") || "-__v";
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }

  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();

    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const totalPages = Math.ceil(total / limit);
    return {
      total,
      page,
      limit,
      totalPages,
    };
  }
}

export default QueryBuilder;
