//used for data access to controller. Can be function i think?

class return_data {
  success: boolean;
  text: string;
  data: any[];

  constructor(success: boolean, text: string, data: any[]) {
    this.success = success;
    this.text = text;
    this.data = data;
  }
}

export default return_data;
