<template>
    <div>
    <b-row class="row-content">
        <b-col cols="{{ contents.length }}" v-for="content in contents" :key="content.driverId">
            <PreviewContent :content = "content" :isDriver="isDriver"></PreviewContent>
        </b-col>
    </b-row>
    
    </div>
</template>

<script>
import PreviewContent from './PreviewContent.vue';
export default {
    name: 'PreviewList',
    components: {
        PreviewContent
    },
    props: {
        contents: {
            type: Array,
            required: true
        },
        isDriver: {
            type: Boolean,
            required: true
        }

    }
}
</script>

<style>
.row-content {
    margin: 0;
    padding: 0;
}
</style>