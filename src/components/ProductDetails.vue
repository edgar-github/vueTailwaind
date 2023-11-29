<template>
    <div class="flex justify-center mt-20">
        <div class="w-full max-w-screen-md">
            <div class="my-5">
                <a class="no-underline hover:text-gray-400 cursor-pointer border border-black-600 rounded p-3" @click="$router.go(-1)">← back</a>
            </div>
            <div class="w-full bg-white  duration-500 flex justify-between">
                <img :src="getImgUrl(product.image)" :alt="product.name" class="h-80 w-72 object-cover rounded-t-xl"/>
                <div class="px-4 py-3 flex flex-col">
                    <span class="text-gray-400 mr-3 uppercase text-xs"><strong>Brand:</strong> {{ product.brand }} </span>
                    <p class="text-lg font-bold text-black truncate block capitalize">{{ product.name }}</p>
                    <p class="text-lg font-semibold text-black cursor-auto my-3">{{ product.price }}</p>
                    <div class="flex items-center">
                        <p>{{ product.description }}</p>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
import productsData from '@/assets/products.json'

export default {
    data() {
        return {
            products: productsData,
        };
    },
    computed: {
        product() {
            const slug = this.$route.params.slug;
            return this.products.find(product => product.slug === slug);
        },
    },
    methods: {
        getImgUrl(pic) {
            return new URL(`../assets/product-images/${pic}`, import.meta.url).href
        }
    },
};
</script>