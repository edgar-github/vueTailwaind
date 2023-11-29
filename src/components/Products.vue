<template>
    <div>
        <SearchProduct :search-query="searchQuery" @search="handleSearch" />
        <main v-if="paginatedProducts.length">
            <section class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
                <div v-for="product in paginatedProducts" :key="product.id" class="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                    <router-link :to="`/products/${product.slug}`">
                        <img :src="getImgUrl('product-images/'+product.image)" :alt="product.name" class="h-80 w-72 object-cover rounded-t-xl"/>
                        <div class="px-4 py-3 w-72">
                            <span class="text-gray-400 mr-3 uppercase text-xs"><strong>Brand:</strong> {{ product.brand }} </span>
                            <p class="text-lg font-bold text-black truncate block capitalize">{{ product.name }}</p>
                            <div class="flex items-center">
                                <p class="text-lg font-semibold text-black cursor-auto my-3">{{ product.price }}</p>
                                <div class="ml-auto">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-bag-plus" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"/>
                                        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </section>
        </main>

        <Not-found v-else/>

        <div v-if="filteredProducts.length > pageSize" class="flex justify-center">
            <Pagination
                :current-page="currentPage"
                :total-pages="totalPages"
                :first-page="firstPage"
                @update-page="handlePageChange"
            ></Pagination>
        </div>

    </div>
</template>

<script>
import productsData from '@/assets/products.json'
import SearchProduct from "@/components/templates/Search.vue";
import NotFound from "@/components/templates/404.vue"
import Pagination from "@/components/templates/Pagination.vue"

export default {
    data() {
        return {
            searchQuery: '',
            products: productsData,
            currentPage: 1,
            pageSize: 3,
            firstPage: 1,
        };
    },
    components: {
        SearchProduct,
        NotFound,
        Pagination,
    },
    computed: {
        filteredProducts() {
            if (this.searchQuery) {
                if (this.filteredProducts.length < (this.pageSize * this.currentPage) - 2) {
                    this.currentPage = 1
                }

                this.updateSearchUrl()
                return this.products.filter(product =>
                    product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
                );
            }

            this.clearSearchParameter()
            return this.products;
        },

        totalPages() {
            return Math.ceil(this.filteredProducts.length / this.pageSize);
        },

        paginatedProducts() {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.filteredProducts.slice(startIndex, endIndex);
        },
    },

    methods: {
        clearSearchParameter() {
            const query = Object.assign({}, this.$route.query);
            delete query.search;
            this.$router.replace({ query });
        },
        updateSearchUrl() {
            this.$router.push({query: {search: this.searchQuery}});
        },
        getImgUrl(pic) {
            return new URL(`../assets/${pic}`, import.meta.url).href
        },
        handleSearch(query) {
            this.searchQuery = query;
        },
        handlePageChange(page) {
            this.currentPage = page;
        },
        detectSearchPage() {
            let uri = window.location.search.substring(1);
            let params = new URLSearchParams(uri);

            if (params.get("search") !== null) {
                this.searchQuery = params.get("search")
            }
        }
    },

    mounted() {
        this.detectSearchPage()
    }
};
</script>


