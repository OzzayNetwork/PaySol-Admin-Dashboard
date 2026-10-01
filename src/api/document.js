import axios from "axios"

const API_BASE = "https://6945933aed253f51719bc9a5.mockapi.io/mockCRM"
const API_BASE_2 = "https://692e89cd91e00bafccd430bf.mockapi.io/"

export default {
  categories() {
    return `${API_BASE}/categories`
  },
  files() {
    return `${API_BASE}/files`
  },
  fileTypes() {
    return `${API_BASE_2}/fileType`
  },
  fileFolder() {
    return `${API_BASE_2}/fileFolder`
  }
}