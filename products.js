let productModal = ''

const app = Vue.createApp({
  data() {
    return {
      baseUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'hsiaoi-2023',
      tempProduct: {},
      products: [],
      isNew: false
    }
  },
  methods: {
    // productDetail(product) {
    //   this.tempProduct = product
    // },

    checkAdmin() {
      const url = `${this.baseUrl}/api/user/check`

        axios.post(url)
        .then((res) => {
          console.log(res);
          this.getProducts()
          console.log(this.products);
        })
        .catch((err) => {
          console.log(err);
          window.location('index.html')
        })
    },

    getProducts() {
      const url = `${this.baseUrl}/api/${this.apiPath}/admin/products/all`

      axios.get(url)
      .then((res) => {
        console.log(res);
        this.products = res.data.products
      })
      .catch((err) => {
        console.log(err);
      })
    },
    openModal(state, product) {
      if (state === 'new') {
        this.tempProduct = {}
        productModal.show()
        console.log(state);
      } 
      
      if (state === 'edit') {
        this.tempProduct = product
        productModal.show()
        console.log(state);
        console.log(product);
      }
      
    },
    closeModal() {
      productModal.hide()
    }
  },
  mounted() {
    productModal = new bootstrap.Modal(document.getElementById('productModal'))

    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1")
      
    axios.defaults.headers.common['Authorization'] = token

    this.checkAdmin()
    
    // this.getProducts()
  }
})
app.mount('#app')

