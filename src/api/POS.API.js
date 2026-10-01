import axios from "axios"

const API_BASE = "https://69b807dfffbcd0286096fa0b.mockapi.io/mockCRM"
const API_BASE_MOCKUP = "https://69b807dfffbcd0286096fa0a.mockapi.io"
const API_BASE_VIVIAN_MOCKUP="https://69c2bce57518bf8facbf5cb8.mockapi.io"
const API_BASE_GIT_MOCKUP="https://69c3f219b780a9ba03e86abc.mockapi.io"
const API_BASE_YAHOO_MOCKUP="https://69d274115043d95be971e72e.mockapi.io"
const API_LOCAL_HOST="http://localhost/pos-api"

export default {
  products() {
    return `${API_LOCAL_HOST}/products`
  },
  categories() {
    return `${API_BASE_MOCKUP}/categories`
  },
   packaging() {
    return `${API_BASE_VIVIAN_MOCKUP}/Packaging`
  },
   taxType() {
    return `${API_BASE_VIVIAN_MOCKUP}/taxType`
  }
  ,
   measuringUnits() {
    return `${API_BASE_GIT_MOCKUP}/measurements`
  },
  dailyStockSnapshot(){
    return `${API_BASE_YAHOO_MOCKUP}/daily_stock_snapshots`
  },
   stockMovements(){
    return `${API_BASE_YAHOO_MOCKUP}/stock_movements`
  },

  //pos and selling apis 
   tables() {
    return `${API_LOCAL_HOST}/tables`
  },
  customers() {
    return `${API_LOCAL_HOST}/customers`
  },
  sales() {
    return `${API_LOCAL_HOST}/sales`
  }
}