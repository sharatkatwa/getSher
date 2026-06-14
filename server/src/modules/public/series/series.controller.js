import PublicSeriesService from "./series.service.js";

export default class PublicSeriesController {
  constructor() {
    this.seriesService = new PublicSeriesService();
  }

  async getSeries(req, res) {
    const data = await this.seriesService.getSeries();

    res.json({ data });
  }

  async getSeriesDetails(req, res) {
    const data = await this.seriesService.getSeriesDetails(req.params.id);
    res.json({ data });
  }
}
