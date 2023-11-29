<template>
    <nav aria-label="Page navigation example">
        <ul class="inline-flex items-center -space-x-px">
            <li>
                <a aria-current="page" :class="{ 'cursor-not-allowed': currentPage === firstPage }"
                   @click="prevPage" href="#" aria-label="Previous"
                   class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span class="sr-only">Previous</span>
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                              clip-rule="evenodd"></path>
                    </svg>
                </a>
            </li>

            <li v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }" class="py-6 px-1">
                <a :class="{ 'bg-gray-700 text-white': page === currentPage }" @click="goToPage(page)" href="#"
                   class=" px-3 py-2 leading-tight text-gray-500 bg-white-600 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{{ page }}</a>
            </li>

            <li>
                <a :class="{ 'cursor-not-allowed': currentPage === totalPages }" @click="nextPage" href="#"
                   class="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span class="sr-only">Next</span>
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                    </svg>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>

export default {
    props: {
        totalPages: {
            type: Number,
            required: true
        },
        firstPage: {
            type: Number,
            required: true
        },
        currentPage: {
            type: Number,
            required: true
        }
    },
    methods: {
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.$emit('update-page', this.currentPage + 1);
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.$emit('update-page', this.currentPage - 1);
            }
        },
        goToPage(page) {
            if (page !== this.currentPage) {
                this.$emit('update-page', page);
            }
        },
    },
};
</script>


