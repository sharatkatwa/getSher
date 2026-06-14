import SeriesRepository from "../../../repository/series.repository.js";
import { NotFoundError } from "../../../shared/error/custom.errors.js";

export default class PublicSeriesService {
  constructor() {
    this.seriesRepo = new SeriesRepository();
  }

  async getSeries() {
    return await this.seriesRepo.findAll();
  }

  async getSeriesDetails(id) {
    const series = await this.seriesRepo.findById(id);

    if(!series) {
        throw new NotFoundError("Series not found")
    }

    return series
  }
}
