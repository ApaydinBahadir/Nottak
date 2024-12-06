class ReturnData {
    success: boolean;
    text: string;
    data: any[];
  
    constructor(success: boolean, text: string, data: any[]) {
      this.success = success;
      this.text = text;
      this.data = data;
    }
  }
  
  export default ReturnData;
  