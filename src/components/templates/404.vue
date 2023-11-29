<template>
    <section  class="flex justify-center">
        <img :src="getImgUrl('images/product-not-found.png')" alt="not found" class="w-full max-w-screen-sm"/>
    </section>
</template>

<script>
export default {
    methods: {
        getImgUrl(pic) {
            return new URL(`../../assets/${pic}`, import.meta.url).href
        }
    }
};
</script>