let productModal = ''
let delProductModal = ''

const app = Vue.createApp({
  data() {
    return {
      baseUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'hsiaoi-2023',
      // tempProduct: {},
      products: [],
      isNew: false,
      productData: {
        title: "",
        category: "",
        origin_price: 0,
        price: 0,
        unit: "",
        description: "",
        content: "",
        is_enabled: 1,
        imageUrl: "",
        imagesUrl: []
      },
      
    }
  },
  methods: {
    // productDetail(product) {
    //   this.tempProduct = product
    // },

    checkAdmin() {
      const url = `${this.baseUrl}/api/user/check`

        axios.post(url)
        .then(() => {
          // console.log(res);
          this.getProducts()
          console.log(this.products);
        })
        .catch(() => {
          // console.log(err);
          alert('請重新登入')
          window.location = 'index.html'
        })
    },

    getProducts() {
      const url = `${this.baseUrl}/api/${this.apiPath}/admin/products/all`

      axios.get(url)
      .then(() => {
        // console.log(res);
        this.products = res.data.products
      })
      .catch(() => {
        // console.log(err);
        alert('發生錯誤，請與管理者聯繫')
      })
    },
    
    openModal(state, product) {
      if (state === 'new') {
        this.isNew = true
        this.productData = {}
        productModal.show()
      } else if (state === 'edit') {
        this.isNew = false
        this.productData = product
        productModal.show()
      } else if (state === 'delete') {
        this.productData = product
        delProductModal.show()
      }
    },

    closeModal() {
      productModal.hide()
    },

    //新增和編輯寫一起
    updateProduct() {
      let url = `${this.baseUrl}/api/${this.apiPath}/admin/product`

      let httpRequest = 'post'

      if (this.isNew === false) {
        url = `${this.baseUrl}/api/${this.apiPath}/admin/product/${this.productData.id}`
        httpRequest = 'put'
      }

      axios[httpRequest](url, { data: this.productData })
      .then(() => {
        // console.log(res);
        this.closeModal()
        this.getProducts()
      })
      .catch(() => {
        // console.log(err);
        alert('請注意是否有未填資訊')
      })
      
    }
  },
  mounted() {
    productModal = new bootstrap.Modal(document.getElementById('productModal'))

    delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'))

    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1")
      
    axios.defaults.headers.common['Authorization'] = token
    this.checkAdmin()
    
    // this.getProducts()
  }
})
app.mount('#app')

