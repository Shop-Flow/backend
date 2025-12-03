export class ApiResponse {
  constructor(status = 200, data = null, message = "") {
    this.status = status;
    this.success = status >= 200 && status < 300;
    this.data = data;
    this.message = message;
  }
}
